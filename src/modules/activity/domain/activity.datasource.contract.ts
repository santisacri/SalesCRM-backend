import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { DealStageEnum } from "../../deal/domain/deal.entity";
import { ActivityEntity, ActivityTypeEnum } from "./activity.entity";

type BaseActivityInput = {
    organizationId: string
    contactId: string
    dealId: string | null
    createdById: string
}

export type CreateActivityInput =
    | (BaseActivityInput & {
        type: ActivityTypeEnum.NOTE
        content: { text: string }
    })
    | (BaseActivityInput & {
        type: ActivityTypeEnum.STAGE_CHANGE
        content: { from: DealStageEnum; to: DealStageEnum }
    })

export interface IActivityDatasource {
    create(data: CreateActivityInput, tx?: PrismaTransactionClient): Promise<ActivityEntity>
    findManyByContactId(contactId: string, organizationId: string): Promise<ActivityEntity[]>
    findManyByDealId(dealId: string, organizationId: string): Promise<ActivityEntity[]>
}