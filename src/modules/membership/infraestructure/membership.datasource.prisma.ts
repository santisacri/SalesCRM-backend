import { Membership, PrismaClient } from "../../../generated/prisma/client";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { IMembershipDatasource, MembershipWithUser } from "../domain/membership.datasource.contract";
import { MembershipEntity, MembershipRoleEnum, MembershipStatusEnum } from "../domain/membership.entity";
import { CreateMembershipInput } from "../presentation/membership.schemas";


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

    async findActive(userId: string, organizationId: string): Promise<MembershipEntity | null> {
        try {
            const membership = await this.prisma.membership.findFirst({
                where: { userId, organizationId, status: "ACTIVE" }
            })

            if (!membership) return null

            return this.toEntity(membership)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async findManyByUserId(userId: string, status: MembershipStatusEnum): Promise<MembershipEntity[]> {
        try {
            const memberships = await this.prisma.membership.findMany({
                where: { userId, status }
            })

            return memberships.map(this.toEntity)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async findManyByOrg(organizationId: string, status: MembershipStatusEnum): Promise<MembershipWithUser[]> {
        try {
            const memberships = await this.prisma.membership.findMany({
                where: { organizationId, status },
                include: {
                    user: { select: { name: true, email: true } }
                },
                orderBy: { createdAt: "desc" }
            })

            return memberships.map((membership) => {
                return {
                    membership: this.toEntity(membership),
                    user: {
                        name: membership.user.name,
                        email: membership.user.email
                    }
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async findManyByTeam(organizationId: string, teamId: string): Promise<MembershipWithUser[]> {
        try {
            const memberships = await this.prisma.membership.findMany({
                where: { organizationId, teamId, status: "ACTIVE" },
                include: {
                    user: { select: { name: true, email: true } }
                },
                orderBy: { createdAt: "desc" }
            })

            return memberships.map((membership) => {
                return {
                    membership: this.toEntity(membership),
                    user: {
                        name: membership.user.name,
                        email: membership.user.email
                    }
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async update(membership: MembershipEntity, tx?: PrismaTransactionClient): Promise<MembershipEntity> {
        try {
            const client = tx ?? this.prisma
            const record = await client.membership.update({
                where: { id: membership.id },
                data: { ...membership }
            })

            return this.toEntity(record)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async create(data: CreateMembershipInput, organizationId: string, tx?: PrismaTransactionClient): Promise<MembershipEntity> {
        try {
            const client = tx ?? this.prisma
            const membership = await client.membership.create({
                data: { ...data, organizationId }
            })

            return this.toEntity(membership)
        } catch (error) {
            handlePrismaError(error)
        }
    }

}