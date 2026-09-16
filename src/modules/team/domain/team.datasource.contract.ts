import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { TeamEntity } from "./team.entity";

export interface ITeamSummary {
    id: string
    organizationId: string
    name: string
    adminId: string
    adminName: string
    memberCount: number
    openDealsCount: number
    openDealsAmount: number
}

export interface ITeamDatasource {
    create(name: string, adminId: string, organizationId: string, tx?: PrismaTransactionClient): Promise<TeamEntity>
    getById(teamId: string, organizationId: string): Promise<TeamEntity>
    listByOrgWithSummary(organizationId: string): Promise<ITeamSummary[]>
    update(team: TeamEntity, tx?: PrismaTransactionClient): Promise<TeamEntity>
}