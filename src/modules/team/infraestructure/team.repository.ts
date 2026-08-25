import { ITeamDatasource } from "../domain/team.datasource.contract";
import { TeamEntity } from "../domain/team.entity";
import { ITeamRepository } from "../domain/team.repository.contract";


export class TeamRepository implements ITeamRepository {

    constructor(
        private readonly teamDatasource: ITeamDatasource
    ) { }

    create(name: string, adminId: string, organizationId: string): Promise<TeamEntity> {
        return this.teamDatasource.create(name, adminId, organizationId)
    }
    listByOrg(organizationId: string): Promise<TeamEntity[]> {
        return this.teamDatasource.listByOrg(organizationId)
    }
    update(team: TeamEntity): Promise<TeamEntity> {
        return this.teamDatasource.update(team)
    }

}