import { Invitation, PrismaClient } from "../../../generated/prisma/client";
import { INVITATION_EXPIRATION_MS } from "../../../shared/config/constants";
import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { IInvitationDatasource } from "../domain/invitation.datasource.contract";
import { InvitationEntity, InvitationStatusEnum } from "../domain/invitation.entity";


export class InvitationDatasource implements IInvitationDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    private toEntity = (record: Invitation): InvitationEntity => {
        return InvitationEntity.fromObject({
            ...record,
            role: record.role as unknown as MembershipRoleEnum,
            status: record.status as unknown as InvitationStatusEnum
        })
    }

    async create(email: string, token: string, invitedByCtx: OrgScopedCtx): Promise<InvitationEntity> {
        try {
            const invitation = await this.prisma.invitation.create({
                data: {
                    email, invitedById: invitedByCtx.userId,
                    token,
                    organizationId: invitedByCtx.organizationId,
                    expiresAt: new Date(Date.now() + INVITATION_EXPIRATION_MS)
                }
            })

            return this.toEntity(invitation)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async findByToken(token: string): Promise<InvitationEntity | null> {
        try {
            const invitation = await this.prisma.invitation.findFirst({
                where: { token }
            })

            if (!invitation) return null;

            return this.toEntity(invitation)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async findById(id: string): Promise<InvitationEntity | null> {
        try {
            const invitation = await this.prisma.invitation.findUnique({
                where: { id }
            })

            if (!invitation) return null;

            return this.toEntity(invitation)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async listByOrg(organizationId: string): Promise<InvitationEntity[]> {
        try {
            const invitations = await this.prisma.invitation.findMany({
                where: { organizationId }
            })

            return invitations.map(this.toEntity)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async update(invitation: InvitationEntity, tx?: PrismaTransactionClient): Promise<InvitationEntity> {
        try {
            const client = tx ?? this.prisma

            const updatedInvitation = await client.invitation.update({
                where: { id: invitation.id },
                data: { ...invitation }
            })

            return this.toEntity(updatedInvitation)
        } catch (error) {
            handlePrismaError(error)
        }
    }

}