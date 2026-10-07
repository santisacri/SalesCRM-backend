import { Activity, PrismaClient } from "../../../generated/prisma/client";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { IActivityDatasource } from "../domain/activity.datasource.contract";
import { ActivityEntity, ActivityTypeEnum } from "../domain/activity.entity";


export class ActivityDatasource implements IActivityDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    toEntity(record: Activity) {
        return ActivityEntity.fromObject({
            ...record,
            content: record.content as Record<string, unknown>,
            type: record.type as ActivityTypeEnum
        })
    }

    async findManyByDealId(dealId: string, organizationId: string): Promise<ActivityEntity[]> {
        try {
            const activities = await this.prisma.activity.findMany({
                where: { dealId, organizationId }
            })

            return activities.map(this.toEntity)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async findManyByContactId(contactId: string, organizationId: string): Promise<ActivityEntity[]> {
        try {
            const activities = await this.prisma.activity.findMany({
                where: { contactId, organizationId }
            })

            return activities.map(this.toEntity)
        } catch (error) {
            handlePrismaError(error)
        }
    }

}