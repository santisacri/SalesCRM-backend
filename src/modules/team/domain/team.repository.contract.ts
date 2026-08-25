import { TeamEntity } from "./team.entity";

export interface ITeamRepository {
    create(name: string, adminId: string, organizationId: string): Promise<TeamEntity>
    listByOrg(organizationId: string): Promise<TeamEntity[]>
    update(team: TeamEntity): Promise<TeamEntity>
}