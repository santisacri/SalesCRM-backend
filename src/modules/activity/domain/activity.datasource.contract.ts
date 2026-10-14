import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { DealStageEnum } from "../../deal/domain/deal.entity";
import { ListActivitiesQuery } from "../presentation/activity.schemas";
import { ActivityEntity, ActivityTypeEnum } from "./activity.entity";

type BaseActivityInput = {
    organizationId: string
    contactId: string
    dealId: string | null
    createdById: string
}

export type ActivityPage = {
    activities: ActivityEntity[]
    nextCursor: string | null
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
    listByContactId(contactId: string, organizationId: string, teamId: string | null,{ cursor, limit, from, to }: ListActivitiesQuery): Promise<ActivityPage>
    findManyByDealId(dealId: string, organizationId: string): Promise<ActivityEntity[]>
}