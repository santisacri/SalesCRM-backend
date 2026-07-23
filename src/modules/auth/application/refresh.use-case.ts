import { ACCESS_TOKEN_EXP } from "../../../shared/config/constants";
import { CustomError } from "../../../shared/errors/custom-errors";
import { IJWTService } from "../../../shared/services/jwt.service";
import { TokenUtil } from "../../../shared/utils/token.util";
import { IRefreshTokenRepository } from "../domain/refresh-token.repository.contract";

export interface IRefreshUseCase {
    execute(rawRefreshToken: string): Promise<{ rawRefreshToken: string, accessToken: string }>
}

export class RefreshUseCase implements IRefreshUseCase {

    constructor(
        private readonly refreshTokenRepo: IRefreshTokenRepository,
        private readonly jwtService: IJWTService
    ) { }

    async execute(rawRefreshToken: string): Promise<{ rawRefreshToken: string; accessToken: string; }> {
        const hashedToken = TokenUtil.hash(rawRefreshToken)
        const stored = await this.refreshTokenRepo.findByToken(hashedToken)

        if (!stored) throw CustomError.notFound('Token not found')

        if (stored.revoked) {
            await this.refreshTokenRepo.revokeFamily(stored.family)
            throw CustomError.unauthorized('Token already used')
        }

        if (stored.isExpired()) throw CustomError.unauthorized('Expired token')

        await this.refreshTokenRepo.revokeById(stored.id)

        const { rawRefreshToken: rawRT } = await this.refreshTokenRepo.create(stored.id)

        const newAccessToken = this.jwtService.sign(stored.id, ACCESS_TOKEN_EXP)

        return {
            accessToken: newAccessToken,
            rawRefreshToken: rawRT
        }
    }

}