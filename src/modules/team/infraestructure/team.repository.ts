import { UserEntity } from "../../user/domain/user.entity";
import { ITeamDatasource } from "../domain/team.datasource.contract";
import { TeamEntity } from "../domain/team.entity";
import { ITeamRepository } from "../domain/team.repository.contract";


export class TeamRepository implements ITeamRepository {

    constructor(
        private readonly teamDatasource: ITeamDatasource
    ) { }


    listByOrgWithAdmin(organizationId: string): Promise<{ team: TeamEntity; admin: UserEntity; }[]> {
        return this.teamDatasource.listByOrgWithAdmin(organizationId)
    }

    getById(teamId: string, organizationId: string): Promise<TeamEntity> {
        return this.teamDatasource.getById(teamId, organizationId)
    }

    create(name: string, adminId: string, organizationId: string): Promise<TeamEntity> {
        return this.teamDatasource.create(name, adminId, organizationId)
    }

    update(team: TeamEntity): Promise<TeamEntity> {
        return this.teamDatasource.update(team)
    }

}