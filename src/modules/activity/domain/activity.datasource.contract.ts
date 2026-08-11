import { ActivityEntity } from "./activity.entity";

export interface IActivityDatasource {
    findManyByContactId(contactId: string, organizationId: string): Promise<ActivityEntity[]>
}