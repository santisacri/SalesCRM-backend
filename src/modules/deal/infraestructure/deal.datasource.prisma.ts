import { Deal, PrismaClient } from "../../../generated/prisma/client";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { IDealDatasource } from "../domain/deal.datasource.contract";
import { DealEntity, DealStageEnum } from "../domain/deal.entity";


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