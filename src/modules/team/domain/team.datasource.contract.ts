import { TeamEntity } from "./team.entity";

export interface ITeamDatasource {
    create(name: string, adminId: string, organizationId: string): Promise<TeamEntity>
    listByOrg(organizationId: string): Promise<TeamEntity[]>
    update(team: TeamEntity): Promise<TeamEntity>
}