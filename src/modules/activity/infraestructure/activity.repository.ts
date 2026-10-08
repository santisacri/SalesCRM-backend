import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { CreateActivityInput, IActivityDatasource } from "../domain/activity.datasource.contract";
import { ActivityEntity } from "../domain/activity.entity";
import { IActivityRepository } from "../domain/activity.repository.contract";


export class ActivityRepository implements IActivityRepository {

    constructor(
        private readonly activityDatasource: IActivityDatasource
    ) { }

    create(data: CreateActivityInput, tx?: PrismaTransactionClient): Promise<ActivityEntity> {
        return this.activityDatasource.create(data, tx)
    }

    findManyByDealId(dealId: string, organizationId: string): Promise<ActivityEntity[]> {
        return this.activityDatasource.findManyByContactId(dealId, organizationId)
    }

    findManyByContactId(contactId: string, organizationId: string): Promise<ActivityEntity[]> {
        return this.activityDatasource.findManyByContactId(contactId, organizationId)
    }

}