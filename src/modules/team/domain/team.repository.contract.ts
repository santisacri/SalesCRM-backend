import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { ITeamSummary } from "./team.datasource.contract";
import { TeamEntity } from "./team.entity";

export interface ITeamRepository {
    create(name: string, adminId: string, organizationId: string, tx?: PrismaTransactionClient): Promise<TeamEntity>
    getById(teamId: string, organizationId: string): Promise<TeamEntity>
    listByOrgWithSummary(organizationId: string): Promise<ITeamSummary[]>
    update(team: TeamEntity, tx?: PrismaTransactionClient): Promise<TeamEntity>
}