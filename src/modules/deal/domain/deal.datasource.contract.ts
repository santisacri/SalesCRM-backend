import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { CreateDealInput } from "../presentation/deal.schemas";
import { DealEntity, DealStageEnum } from "./deal.entity";

export type DealsByStage = Record<DealStageEnum, DealEntity[]>

export type StageStats = {
    stage: DealStageEnum
    count: number
    amount: number
}

export interface IDealDatasource {
    create(data: CreateDealInput, organizationId: string): Promise<DealEntity>
    findById(dealId: string, organizationId: string): Promise<DealEntity | null>
    listByStage(organizationId: string, teamId: string | null): Promise<DealsByStage>
    update(deal: DealEntity, tx?: PrismaTransactionClient): Promise<DealEntity>
    findManyByContactId(contactId: string, organizationId: string): Promise<DealEntity[]>
    statsByStage(organizationId: string, teamScope: string | null, closedSince: Date): Promise<StageStats[]>
    wonSince(organizationId: string, teamScope: string | null, since: Date): Promise<{ count: number; amount: number }>
}