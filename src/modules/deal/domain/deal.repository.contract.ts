import { DealEntity } from "./deal.entity";

export interface IDealRepository {
    findManyByContactId(contactId: string, organizationId: string): Promise<DealEntity[]>
}