import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { ITeamDatasource, ITeamSummary } from "../domain/team.datasource.contract";
import { TeamEntity } from "../domain/team.entity";
import { ITeamRepository } from "../domain/team.repository.contract";


export class TeamRepository implements ITeamRepository {

    constructor(
        private readonly teamDatasource: ITeamDatasource
    ) { }


    listByOrgWithSummary(organizationId: string): Promise<ITeamSummary[]> {
        return this.teamDatasource.listByOrgWithSummary(organizationId)
    }

    getById(teamId: string, organizationId: string): Promise<TeamEntity> {
        return this.teamDatasource.getById(teamId, organizationId)
    }

    create(name: string, adminId: string, organizationId: string, tx?: PrismaTransactionClient): Promise<TeamEntity> {
        return this.teamDatasource.create(name, adminId, organizationId, tx)
    }

    update(team: TeamEntity, tx?: PrismaTransactionClient): Promise<TeamEntity> {
        return this.teamDatasource.update(team, tx)
    }

}