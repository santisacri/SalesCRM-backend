import { DealsByStage, IDealDatasource } from "../domain/deal.datasource.contract";
import { DealEntity, DealStageEnum } from "../domain/deal.entity";
import { IDealRepository } from "../domain/deal.repository.contract";
import { CreateDealInput } from "../presentation/deal.schemas";

export class DealRepository implements IDealRepository {

    constructor(
        private readonly dealDatasource: IDealDatasource
    ) { }


    createDeal(data: CreateDealInput, organizationId: string): Promise<DealEntity> {
        return this.dealDatasource.createDeal(data, organizationId)
    }

    findDealById(dealId: string, organizationId: string): Promise<DealEntity | null> {
        return this.dealDatasource.findDealById(dealId, organizationId)
    }

    listDealsByStage(organizationId: string, teamId: string): Promise<DealsByStage> {
        return this.dealDatasource.listDealsByStage(organizationId, teamId)
    }

    updateDeal(deal: DealEntity, organizationId: string): Promise<DealEntity> {
        return this.dealDatasource.updateDeal(deal, organizationId)
    }

    updateDealStage(dealId: string, stage: DealStageEnum, organizationId: string): Promise<DealEntity> {
        return this.dealDatasource.updateDealStage(dealId, stage, organizationId)
    }

    findManyByContactId(contactId: string, organizationId: string): Promise<DealEntity[]> {
        return this.dealDatasource.findManyByContactId(contactId, organizationId)
    }

}