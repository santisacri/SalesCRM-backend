import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { ListActivitiesQuery } from "../presentation/activity.schemas";
import { ActivityPage, CreateActivityInput } from "./activity.datasource.contract";
import { ActivityEntity } from "./activity.entity";

export interface IActivityRepository {
    create(data: CreateActivityInput, tx?: PrismaTransactionClient): Promise<ActivityEntity>
    listByContactId(contactId: string, organizationId: string, teamId: string | null, { cursor, limit, from, to }: ListActivitiesQuery): Promise<ActivityPage>
    findManyByDealId(dealId: string, organizationId: string): Promise<ActivityEntity[]>
}