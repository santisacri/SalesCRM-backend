import { Activity, PrismaClient } from "../../../generated/prisma/client";
import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { ActivityPage, CreateActivityInput, IActivityDatasource } from "../domain/activity.datasource.contract";
import { ActivityEntity, ActivityTypeEnum } from "../domain/activity.entity";
import { ListActivitiesQuery } from "../presentation/activity.schemas";


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

    async create(data: CreateActivityInput, tx?: PrismaTransactionClient): Promise<ActivityEntity> {
        try {
            const client = tx ?? this.prisma

            const activity = await client.activity.create({ data })

            return this.toEntity(activity)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async listByContactId(contactId: string, organizationId: string, teamId: string | null, { cursor, limit, from, to }: ListActivitiesQuery): Promise<ActivityPage> {
        try {
            const rows = await this.prisma.activity.findMany({
                where: {
                    organizationId,
                    contactId,
                    ...((from || to) && {
                        createdAt: {
                            ...(from && { gte: from }),
                            ...(to && { lte: to }),
                        },
                    }),
                    ...(teamId && {
                        OR: [
                            { dealId: null },
                            { deal: { teamId } },
                        ],
                    })
                },
                orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
                take: limit + 1,
                ...(cursor && { cursor: { id: cursor }, skip: 1 }),
            })

            const hasMore = rows.length > limit
            const page = hasMore ? rows.slice(0, limit) : rows

            return {
                activities: page.map(this.toEntity),
                nextCursor: hasMore ? page[page.length - 1].id : null,
            }
        } catch (error) {
            return handlePrismaError(error)
        }
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

}