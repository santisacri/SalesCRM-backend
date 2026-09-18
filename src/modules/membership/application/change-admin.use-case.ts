import { ITransactionManager } from "../../../shared/database/transaction-manager";
import { CustomError } from "../../../shared/errors/custom-errors";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { ITeamRepository } from "../../team/domain/team.repository.contract";
import { MembershipEntity, MembershipRoleEnum } from "../domain/membership.entity";
import { IMembershipRepository } from "../domain/membership.repository.contract";
import { ChangeAdminInput } from "../presentation/membership.schemas";

export interface IChangeAdminUseCase {
    execute(input: ChangeAdminInput, ctx: OrgScopedCtx): Promise<MembershipEntity>
}

export class ChangeAdminUseCase implements IChangeAdminUseCase {

    constructor(
        private readonly membershipRepo: IMembershipRepository,
        private readonly teamRepo: ITeamRepository,
        private readonly txManager: ITransactionManager,
    ) { }

    async execute(input: ChangeAdminInput, ctx: OrgScopedCtx): Promise<MembershipEntity> {
        const [newAdmin, admin, team] = await Promise.all([
            await this.membershipRepo.findById(input.newAdminMembershipId, ctx.organizationId),
            await this.membershipRepo.findById(input.currentAdminMembershipId, ctx.organizationId),
            await this.teamRepo.getById(input.teamId, ctx.organizationId),
        ])

        if (!newAdmin || !admin) throw CustomError.notFound("Member not found");

        if (newAdmin.role !== MembershipRoleEnum.MEMBER) throw CustomError.badRequest("This user already leads a team");

        return this.txManager.run(async (tx) => {
            await this.membershipRepo.update({ ...admin, role: MembershipRoleEnum.MEMBER }, tx)
            await this.teamRepo.update({ ...team, adminId: newAdmin.userId }, tx)
            return this.membershipRepo.update({ ...newAdmin, role: MembershipRoleEnum.ADMIN }, tx)
        })
    }

}