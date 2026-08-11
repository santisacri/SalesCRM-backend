import { IDealDatasource } from "../domain/deal.datasource.contract";
import { DealEntity } from "../domain/deal.entity";
import { IDealRepository } from "../domain/deal.repository.contract";

export class DealRepository implements IDealRepository {

    constructor(
        private readonly dealDatasource: IDealDatasource
    ) { }

    async findManyByContactId(contactId: string, organizationId: string): Promise<DealEntity[]> {
        return this.dealDatasource.findManyByContactId(contactId, organizationId)
    }

}