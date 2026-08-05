import { ACCESS_TOKEN_EXP } from "../../../shared/config/constants";
import { CustomError } from "../../../shared/errors/custom-errors";
import { ErrorCode } from "../../../shared/errors/error-codes";
import { IJWTService } from "../../../shared/services/jwt.service";
import { IMembershipRepository } from "../../membership/domain/membership.repository.contract";
import { IRefreshTokenRepository } from "../domain/refresh-token.repository.contract";

export interface IRefreshUseCase {
    execute(rawRefreshToken: string): Promise<{ rawRefreshToken: string, accessToken: string }>
}

export class RefreshUseCase implements IRefreshUseCase {

    constructor(
        private readonly refreshTokenRepo: IRefreshTokenRepository,
        private readonly membershipRepo: IMembershipRepository,
        private readonly jwtService: IJWTService
    ) { }

    async execute(rawRefreshToken: string): Promise<{ rawRefreshToken: string; accessToken: string; }> {
        const stored = await this.refreshTokenRepo.findByToken(rawRefreshToken)

        if (!stored) throw CustomError.badRequest('Invalid token', ErrorCode.REFRESH_TOKEN_INVALID)

        if (stored.revoked) {
            await this.refreshTokenRepo.revokeFamily(stored.family)
            throw CustomError.badRequest('Session expired', ErrorCode.REFRESH_TOKEN_INVALID)
        }

        if (stored.isExpired()) throw CustomError.badRequest('Session expired', ErrorCode.REFRESH_TOKEN_INVALID)

        await this.refreshTokenRepo.revokeById(stored.id)

        let orgPayload = {};
        let organizationIdForNewToken: string | undefined = undefined;

        if (stored.organizationId) {
            const membership = await this.membershipRepo.findActive(stored.userId, stored.organizationId);
            if (membership) {
                orgPayload = { organizationId: membership.organizationId, role: membership.role };
                organizationIdForNewToken = membership.organizationId;
            }
        }

        const { rawRefreshToken: rawRT } = await this.refreshTokenRepo.create(stored.userId, organizationIdForNewToken)

        const newAccessToken = this.jwtService.sign({ sub: stored.userId, ...orgPayload }, ACCESS_TOKEN_EXP)

        return {
            accessToken: newAccessToken,
            rawRefreshToken: rawRT
        }
    }

}