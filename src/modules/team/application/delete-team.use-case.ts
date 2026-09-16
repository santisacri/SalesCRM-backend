import { ITransactionManager } from "../../../shared/database/transaction-manager";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { IMembershipRepository } from "../../membership/domain/membership.repository.contract";
import { TeamEntity } from "../domain/team.entity";
import { ITeamRepository } from "../domain/team.repository.contract";

export interface IDeleteTeamUseCase {
    execute(teamId: string, organizationId: string): Promise<TeamEntity>
}

export class DeleteTeamUseCase implements IDeleteTeamUseCase {

    constructor(
        private readonly teamRepo: ITeamRepository,
        private readonly membershipRepo: IMembershipRepository,
        private readonly txManager: ITransactionManager
    ) { }

    async execute(teamId: string, organizationId: string): Promise<TeamEntity> {
        const team = await this.teamRepo.getById(teamId, organizationId)
        const teamAdmin = await this.membershipRepo.findActive(team.adminId, organizationId)

        return this.txManager.run(async (tx) => {
            if (teamAdmin) {
                await this.membershipRepo.update({ ...teamAdmin, role: MembershipRoleEnum.MEMBER, teamId: null }, tx)
            }

            return this.teamRepo.update({ ...team, deletedAt: new Date(Date.now()) }, tx)
        })
    }
}