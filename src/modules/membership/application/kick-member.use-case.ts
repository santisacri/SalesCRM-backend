import { CustomError } from "../../../shared/errors/custom-errors";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { IRefreshTokenRepository } from "../../auth/domain/refresh-token.repository.contract";
import { TeamEntity } from "../../team/domain/team.entity";
import { ITeamRepository } from "../../team/domain/team.repository.contract";
import { MembershipEntity, MembershipRoleEnum, MembershipStatusEnum } from "../domain/membership.entity";
import { IMembershipRepository } from "../domain/membership.repository.contract";

export interface IKickMemberUseCase {
    execute(memberId: string, ctx: OrgScopedCtx): Promise<MembershipEntity>
}

export class KickMemberUseCase implements IKickMemberUseCase {

    constructor(
        private readonly membershipRepo: IMembershipRepository,
        private readonly teamRepo: ITeamRepository,
        private readonly refreshTokenRepo: IRefreshTokenRepository,
    ) { }

    async execute(memberId: string, ctx: OrgScopedCtx): Promise<MembershipEntity> {

        const membership = await this.membershipRepo.findActive(memberId, ctx.organizationId)

        if (!membership) throw CustomError.notFound("Membership not found");

        if (membership.role === MembershipRoleEnum.OWNER) {
            throw CustomError.badRequest("You need to make another member the owner in order to left this organization")
        }

        if (membership.teamId && ctx.role === MembershipRoleEnum.ADMIN) {
            const team = await this.teamRepo.getById(membership.teamId, ctx.organizationId)

            if (ctx.userId !== team.adminId) {
                throw CustomError.forbidden("You can't perform this action")
            }
        }

        const [suspendedMembership] = await Promise.all([
            await this.membershipRepo.update({ ...membership, status: MembershipStatusEnum.SUSPENDED }),
            await this.refreshTokenRepo.revokeByUserIdAndOrgId(membership.userId, membership.organizationId)
        ])

        return suspendedMembership
    }

}