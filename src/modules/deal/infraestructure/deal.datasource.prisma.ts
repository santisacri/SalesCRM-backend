import { Deal, PrismaClient } from "../../../generated/prisma/client";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { IDealDatasource } from "../domain/deal.datasource.contract";
import { DealEntity, DealStageEnum } from "../domain/deal.entity";
import { CreateDealInput } from "../presentation/deal.schemas";


export class DealDatasource implements IDealDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    private toEntity(record: Deal) {
        return DealEntity.fromObject({
            ...record,
            amount: record.amount as unknown as number,
            stage: record.stage as DealStageEnum
        })
    }

    async createDeal(data: CreateDealInput, organizationId: string): Promise<DealEntity> {
        const deal = await this.prisma.deal.create({
            data: {
                ...data,
                organizationId
            }
        })

        return this.toEntity(deal)
    }

    async findDealById(dealId: string, organizationId: string): Promise<DealEntity | null> {
        const deal = await this.prisma.deal.findUnique({
            where: { id: dealId, organizationId }
        })

        if (!deal) return null;

        return this.toEntity(deal)
    }

    async listDealsByStage(stage: DealStageEnum, organizationId: string, teamId: string): Promise<DealEntity[]> {
        const deals = await this.prisma.deal.findMany({
            where: { stage, organizationId, teamId }
        })

        return deals.map(this.toEntity)
    }

    async updateDeal(deal: DealEntity, organizationId: string): Promise<DealEntity> {
        const updatedDeal = await this.prisma.deal.update({
            data: { ...deal },
            where: { id: deal.id, organizationId }
        })

        return this.toEntity(updatedDeal)
    }

    async updateDealStage(dealId: string, stage: DealStageEnum, organizationId: string): Promise<DealEntity> {
        throw new Error("Method not implemented.");
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

}