import { DealEntity } from "./deal.entity";

export interface IDealDatasource {
    findManyByContactId(contactId: string, organizationId: string): Promise<DealEntity[]>
}