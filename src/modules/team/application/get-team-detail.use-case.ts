import { CustomError } from "../../../shared/errors/custom-errors";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { MembershipWithUser } from "../../membership/domain/membership.datasource.contract";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { IMembershipRepository } from "../../membership/domain/membership.repository.contract";
import { TeamEntity } from "../domain/team.entity";
import { ITeamRepository } from "../domain/team.repository.contract";

export interface IGetTeamDetailUseCase {
    execute(teamId: string, ctx: OrgScopedCtx): Promise<{ team: TeamEntity, members: MembershipWithUser[] }>
}

export class GetTeamDetailUseCase implements IGetTeamDetailUseCase {

    constructor(
        private readonly teamRepo: ITeamRepository,
        private readonly membershipRepo: IMembershipRepository
    ) { }

    async execute(teamId: string, ctx: OrgScopedCtx): Promise<{ team: TeamEntity, members: MembershipWithUser[] }> {
        const team = await this.teamRepo.getById(teamId, ctx.organizationId)

        if (ctx.role !== MembershipRoleEnum.OWNER && team.adminId !== ctx.userId) {
            throw CustomError.forbidden("You can't see the details of this team")
        }

        const members = await this.membershipRepo.findManyByTeam(ctx.organizationId, teamId)

        return { team, members }
    }
}