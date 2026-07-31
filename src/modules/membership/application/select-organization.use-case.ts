import { ACCESS_TOKEN_EXP } from "../../../shared/config/constants";
import { CustomError } from "../../../shared/errors/custom-errors";
import { IJWTService } from "../../../shared/services/jwt.service";
import { IRefreshTokenRepository } from "../../auth/domain/refresh-token.repository.contract";
import { IMembershipRepository } from "../domain/membership.repository.contract";

export interface ISelectOrganizationUseCase {
    execute(userId: string, organizationId: string, refreshToken: string): Promise<{ accessToken: string }>
}

export class SelectOrganizationUseCase implements ISelectOrganizationUseCase {

    constructor(
        private readonly membershipRepo: IMembershipRepository,
        private readonly refreshTokenRepo: IRefreshTokenRepository,
        private readonly jwtService: IJWTService,
    ) { }

    async execute(userId: string, organizationId: string, refreshToken: string): Promise<{ accessToken: string }> {
        const membership = await this.membershipRepo.findActive(userId, organizationId)

        if (!membership) throw CustomError.unauthorized("You don't have access to this organization");

        await this.refreshTokenRepo.updateOrganization(refreshToken, organizationId)

        const accessToken = this.jwtService.sign({
            sub: userId,
            organizationId: membership.organizationId,
            role: membership.role
        }, ACCESS_TOKEN_EXP)

        return { accessToken }
    }

}