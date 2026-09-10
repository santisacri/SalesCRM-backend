import { UserEntity } from "../../user/domain/user.entity";
import { TeamEntity } from "./team.entity";

export interface ITeamRepository {
    create(name: string, adminId: string, organizationId: string): Promise<TeamEntity>
    getById(teamId: string, organizationId: string): Promise<TeamEntity>
    listByOrgWithAdmin(organizationId: string): Promise<{ team: TeamEntity, admin: UserEntity }[]>
    update(team: TeamEntity): Promise<TeamEntity>
}