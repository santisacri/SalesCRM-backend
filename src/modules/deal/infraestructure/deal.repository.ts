import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { DealsByStage, IDealDatasource, StageStats } from "../domain/deal.datasource.contract";
import { DealEntity } from "../domain/deal.entity";
import { IDealRepository } from "../domain/deal.repository.contract";
import { CreateDealInput } from "../presentation/deal.schemas";

export class DealRepository implements IDealRepository {

    constructor(
        private readonly dealDatasource: IDealDatasource
    ) { }

    create(data: CreateDealInput, organizationId: string): Promise<DealEntity> {
        return this.dealDatasource.create(data, organizationId)
    }

    findById(dealId: string, organizationId: string): Promise<DealEntity | null> {
        return this.dealDatasource.findById(dealId, organizationId)
    }

    listByStage(organizationId: string, teamId: string): Promise<DealsByStage> {
        return this.dealDatasource.listByStage(organizationId, teamId)
    }

    update(deal: DealEntity, tx?: PrismaTransactionClient): Promise<DealEntity> {
        return this.dealDatasource.update(deal, tx)
    }

    findManyByContactId(contactId: string, organizationId: string): Promise<DealEntity[]> {
        return this.dealDatasource.findManyByContactId(contactId, organizationId)
    }

    statsByStage(organizationId: string, teamScope: string | null, ownerId: string | null, closedSince: Date): Promise<StageStats[]> {
        return this.dealDatasource.statsByStage(organizationId, teamScope, ownerId, closedSince)
    }
    wonSince(organizationId: string, teamScope: string | null, ownerId: string | null, since: Date): Promise<{ count: number; amount: number; }> {
        return this.dealDatasource.wonSince(organizationId, teamScope, ownerId, since)
    }

}