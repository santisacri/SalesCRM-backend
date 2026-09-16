import { ITransactionManager } from "../../../shared/database/transaction-manager";
import { CustomError } from "../../../shared/errors/custom-errors";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { IMembershipRepository } from "../../membership/domain/membership.repository.contract";
import { TeamEntity } from "../domain/team.entity";
import { ITeamRepository } from "../domain/team.repository.contract";
import { CreateTeamInput } from "../presentation/team.schemas";

export interface ICreateTeamUseCase {
    execute(input: CreateTeamInput, ctx: OrgScopedCtx): Promise<TeamEntity>
}

export class CreateTeamUseCase implements ICreateTeamUseCase {

    constructor(
        private readonly teamRepo: ITeamRepository,
        private readonly membershipRepo: IMembershipRepository,
        private readonly txManager: ITransactionManager
    ) { }

    async execute(input: CreateTeamInput, ctx: OrgScopedCtx): Promise<TeamEntity> {
        const member = await this.membershipRepo.findActive(input.adminId, ctx.organizationId)

        if (!member) throw CustomError.notFound("Member not found");

        if (member.role === MembershipRoleEnum.OWNER) throw CustomError.badRequest();

        if (member.role === MembershipRoleEnum.ADMIN) throw CustomError.badRequest("A member can only lead one team at a time");


        const team = this.txManager.run(async (tx) => {
            let team = await this.teamRepo.create(input.name, input.adminId, ctx.organizationId, tx)

            await this.membershipRepo.update({ ...member, role: MembershipRoleEnum.ADMIN, teamId: team.id }, tx)

            return team
        })

        return team
    }

}