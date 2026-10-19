import { Deal, DealStage, PrismaClient } from "../../../generated/prisma/client";
import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { DealsByStage, IDealDatasource, StageStats } from "../domain/deal.datasource.contract";
import { DealEntity, DealStageEnum } from "../domain/deal.entity";
import { CreateDealInput } from "../presentation/deal.schemas";


export class DealDatasource implements IDealDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    private toEntity(record: Deal) {
        return DealEntity.fromObject({
            ...record,
            amount: record.amount.toNumber(),
            stage: record.stage as DealStageEnum
        })
    }

    async create(data: CreateDealInput, organizationId: string): Promise<DealEntity> {
        try {
            const deal = await this.prisma.deal.create({
                data: {
                    ...data,
                    organizationId
                }
            })

            return this.toEntity(deal)
        } catch (error) {
            handlePrismaError(error)
        }

    }

    async findById(dealId: string, organizationId: string): Promise<DealEntity | null> {
        try {
            const deal = await this.prisma.deal.findUnique({
                where: { id: dealId, organizationId }
            })

            if (!deal) return null;

            return this.toEntity(deal)
        } catch (error) {
            handlePrismaError(error)
        }

    }

    async listByStage(organizationId: string, teamId: string | null): Promise<DealsByStage> {
        try {
            const deals = await this.prisma.deal.findMany({
                where: {
                    organizationId,
                    ...(teamId && { teamId })
                },
                orderBy: { createdAt: 'desc' }
            })

            const entities = deals.map(this.toEntity)

            return Object.values(DealStageEnum).reduce((acc, stage) => {
                acc[stage] = entities.filter(deal => deal.stage === stage)
                return acc
            }, {} as DealsByStage)
        } catch (error) {
            return handlePrismaError(error)
        }
    }

    async update(deal: DealEntity, tx?: PrismaTransactionClient): Promise<DealEntity> {
        try {
            const client = tx ?? this.prisma
            const { updatedAt, id, createdAt, organizationId, ...data } = deal

            const updatedDeal = await client.deal.update({
                data: { ...data },
                where: { id, organizationId }
            })

            return this.toEntity(updatedDeal)
        } catch (error) {
            handlePrismaError(error)
        }

    }

    async findManyByContactId(contactId: string, organizationId: string): Promise<DealEntity[]> {
        try {
            const deal = await this.prisma.deal.findMany({
                where: { contactId: contactId, organizationId }
            })

            if (deal.length === 0) return []

            return deal.map(this.toEntity)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async statsByStage(organizationId: string, teamScope: string | null, ownerId: string | null, closedSince: Date): Promise<StageStats[]> {
        try {
            const rows = await this.prisma.deal.groupBy({
                by: ['stage'],
                where: {
                    organizationId,
                    ...(teamScope && { teamId: teamScope }),
                    ...(ownerId && { ownerId: ownerId }),
                    OR: [
                        { stage: { notIn: [DealStage.WON, DealStage.LOST] } },
                        { closedAt: { gte: closedSince } },
                    ],
                },
                _count: { id: true },
                _sum: { amount: true },
            })

            return rows.map(row => ({
                stage: row.stage as DealStageEnum,
                count: row._count.id,
                amount: Number(row._sum.amount ?? 0),
            }))
        } catch (error) {
            return handlePrismaError(error)
        }
    }

    async wonSince(organizationId: string, teamScope: string | null, ownerId: string | null, since: Date): Promise<{ count: number; amount: number; }> {
        try {
            const result = await this.prisma.deal.aggregate({
                where: {
                    organizationId,
                    ...(teamScope && { teamId: teamScope }),
                    ...(ownerId && { ownerId: ownerId }),
                    stage: DealStage.WON,
                    closedAt: { gte: since },
                },
                _count: { id: true },
                _sum: { amount: true },
            })

            return {
                count: result._count.id,
                amount: Number(result._sum.amount ?? 0),
            }
        } catch (error) {
            return handlePrismaError(error)
        }
    }

}