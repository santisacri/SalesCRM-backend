import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { ActivityPage, CreateActivityInput, IActivityDatasource } from "../domain/activity.datasource.contract";
import { ActivityEntity } from "../domain/activity.entity";
import { IActivityRepository } from "../domain/activity.repository.contract";
import { ListActivitiesQuery } from "../presentation/activity.schemas";


export class ActivityRepository implements IActivityRepository {

    constructor(
        private readonly activityDatasource: IActivityDatasource
    ) { }

    listByContactId(contactId: string, organizationId: string, teamId: string | null, { cursor, limit, from, to }: ListActivitiesQuery): Promise<ActivityPage> {
        return this.activityDatasource.listByContactId(contactId, organizationId, teamId, { cursor, limit, from, to })
    }

    create(data: CreateActivityInput, tx?: PrismaTransactionClient): Promise<ActivityEntity> {
        return this.activityDatasource.create(data, tx)
    }

    findManyByDealId(dealId: string, organizationId: string): Promise<ActivityEntity[]> {
        return this.activityDatasource.findManyByDealId(dealId, organizationId)
    }

}