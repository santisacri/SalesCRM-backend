import { CreateDealInput } from "../presentation/deal.schemas";
import { DealEntity, DealStageEnum } from "./deal.entity";

export interface IDealDatasource {
    createDeal(data: CreateDealInput, organizationId: string): Promise<DealEntity>
    findDealById(dealId: string, organizationId: string): Promise<DealEntity | null>
    listDealsByStage(stage: DealStageEnum, organizationId: string, teamId: string): Promise<DealEntity[]>
    updateDeal(deal: DealEntity, organizationId: string): Promise<DealEntity>
    updateDealStage(dealId: string, stage: DealStageEnum, organizationId: string): Promise<DealEntity>
    findManyByContactId(contactId: string, organizationId: string): Promise<DealEntity[]>
}