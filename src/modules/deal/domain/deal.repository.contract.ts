import { CreateDealInput } from "../presentation/deal.schemas";
import { DealsByStage } from "./deal.datasource.contract";
import { DealEntity, DealStageEnum } from "./deal.entity";

export interface IDealRepository {
    createDeal(data: CreateDealInput, organizationId: string): Promise<DealEntity>
    findDealById(dealId: string, organizationId: string): Promise<DealEntity | null>
    listDealsByStage(organizationId: string, teamId: string | null): Promise<DealsByStage>
    updateDeal(deal: DealEntity, organizationId: string): Promise<DealEntity>
    updateDealStage(dealId: string, stage: DealStageEnum, organizationId: string): Promise<DealEntity>
    findManyByContactId(contactId: string, organizationId: string): Promise<DealEntity[]>
}