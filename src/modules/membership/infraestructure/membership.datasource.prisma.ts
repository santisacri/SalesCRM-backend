import { Membership, PrismaClient } from "../../../generated/prisma/client";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { IMembershipDatasource, TCreateMembership } from "../domain/membership.datasource.contract";
import { MembershipEntity, MembershipRoleEnum, MembershipStatusEnum } from "../domain/membership.entity";


export class MembershipDatasource implements IMembershipDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    toEntity(record: Membership): MembershipEntity {
        return MembershipEntity.fromObject({
            ...record,
            status: record.status as MembershipStatusEnum,
            role: record.role as MembershipRoleEnum
        })
    }

    async create(data: TCreateMembership, tx?: PrismaTransactionClient): Promise<MembershipEntity> {
        try {
            const client = tx ?? this.prisma
            const membership = await client.membership.create({ data })

            return this.toEntity(membership)
        } catch (error) {
            handlePrismaError(error)
        }
    }

}