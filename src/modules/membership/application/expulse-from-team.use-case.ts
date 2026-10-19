import { CustomError } from "../../../shared/errors/custom-errors";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { MembershipEntity, MembershipRoleEnum, MembershipStatusEnum } from "../domain/membership.entity";
import { IMembershipRepository } from "../domain/membership.repository.contract";

export interface IExpulseFromTeamUseCase {
    execute(membershipId: string, ctx: OrgScopedCtx): Promise<MembershipEntity>
}

export class ExpulseFromTeamUseCase implements IExpulseFromTeamUseCase {

    constructor(
        private readonly membershipRepo: IMembershipRepository
    ) { }

    async execute(membershipId: string, ctx: OrgScopedCtx): Promise<MembershipEntity> {
        const membership = await this.membershipRepo.findById(membershipId, ctx.organizationId)

        if (!membership || membership.status === MembershipStatusEnum.SUSPENDED) {
            throw CustomError.notFound('Membership not found')
        }

        if (ctx.role !== MembershipRoleEnum.OWNER && ctx.teamId !== membership.teamId) {
            throw CustomError.forbidden("You can't perform this action")
        }

        return this.membershipRepo.update({ ...membership, teamId: null })
    }
}