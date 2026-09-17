import { CustomError } from "../../../shared/errors/custom-errors";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { ITeamRepository } from "../../team/domain/team.repository.contract";
import { MembershipEntity, MembershipRoleEnum } from "../domain/membership.entity";
import { IMembershipRepository } from "../domain/membership.repository.contract";

export interface IAssignMemberToTeamUseCase {
    execute(membershipId: string, teamId: string, ctx: OrgScopedCtx): Promise<MembershipEntity>
}

export class AssignMemberToTeamUseCase implements IAssignMemberToTeamUseCase {

    constructor(
        private readonly membershipRepo: IMembershipRepository,
        private readonly teamRepo: ITeamRepository,
    ) { }

    async execute(membershipId: string, teamId: string, ctx: OrgScopedCtx): Promise<MembershipEntity> {
        const [membership, team] = await Promise.all([
            await this.membershipRepo.findById(membershipId, ctx.organizationId),
            await this.teamRepo.getById(teamId, ctx.organizationId)
        ])

        if (!membership) throw CustomError.notFound('Member not found');

        if (membership.role === MembershipRoleEnum.ADMIN) {
            throw CustomError.badRequest('Cannot reassign an admin directly, use the change-admin flow first')
        }

        if (ctx.role === MembershipRoleEnum.ADMIN && team.adminId !== ctx.userId) {
            throw CustomError.forbidden('Cannot assign members to another team')
        }

        return this.membershipRepo.update({
            ...membership,
            teamId: team.id
        })
    }
}