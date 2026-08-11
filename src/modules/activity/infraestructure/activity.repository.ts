import { IActivityDatasource } from "../domain/activity.datasource.contract";
import { ActivityEntity } from "../domain/activity.entity";
import { IActivityRepository } from "../domain/activity.repository.contract";


export class ActivityRepository implements IActivityRepository {

    constructor(
        private readonly activityDatasource: IActivityDatasource
    ) { }

    findManyByContactId(contactId: string, organizationId: string): Promise<ActivityEntity[]> {
        return this.activityDatasource.findManyByContactId(contactId, organizationId)
    }

}