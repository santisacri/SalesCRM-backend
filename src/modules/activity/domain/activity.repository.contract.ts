import { ActivityEntity } from "./activity.entity";

export interface IActivityRepository {
    findManyByContactId(contactId: string, organizationId: string): Promise<ActivityEntity[]>
}