import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { CreateActivityInput } from "./activity.datasource.contract";
import { ActivityEntity } from "./activity.entity";

export interface IActivityRepository {
    create(data: CreateActivityInput, tx?: PrismaTransactionClient): Promise<ActivityEntity>
    findManyByContactId(contactId: string, organizationId: string): Promise<ActivityEntity[]>
    findManyByDealId(dealId: string, organizationId: string): Promise<ActivityEntity[]>
}