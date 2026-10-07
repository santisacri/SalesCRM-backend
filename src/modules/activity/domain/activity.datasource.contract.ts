import { ActivityEntity } from "./activity.entity";

export interface IActivityDatasource {
    findManyByContactId(contactId: string, organizationId: string): Promise<ActivityEntity[]>
    findManyByDealId(dealId: string, organizationId: string): Promise<ActivityEntity[]>
}