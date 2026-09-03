import { OrgScopedCtx } from "../../../shared/types/context.types";
import { TokenUtil } from "../../../shared/utils/token.util";
import { IInvitationDatasource, InvitationWithInviter } from "../domain/invitation.datasource.contract";
import { IInvitationRepository } from "../domain/invitation.repository.contract";
import { InvitationEntity } from "../domain/invitation.entity";
import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";

export class InvitationRepository implements IInvitationRepository {

    constructor(
        private readonly InvitationDatasource: IInvitationDatasource
    ) { }

    async create(email: string, invitedByCtx: OrgScopedCtx): Promise<{ dbRecord: InvitationEntity, rawToken: string }> {

        const rawToken = TokenUtil.generateToken()
        const hashedToken = TokenUtil.hash(rawToken)

        const dbRecord = await this.InvitationDatasource.create(email, hashedToken, invitedByCtx)

        return { dbRecord, rawToken }
    }

    findByToken(token: string): Promise<InvitationEntity | null> {
        const hashedToken = TokenUtil.hash(token)

        return this.InvitationDatasource.findByToken(hashedToken)
    }

    findById(id: string, organizationId: string): Promise<InvitationEntity | null> {
        return this.InvitationDatasource.findById(id, organizationId)
    }

    findByEmail(email: string): Promise<InvitationEntity[]> {
        return this.InvitationDatasource.findByEmail(email)

    }

    listByOrg(organizationId: string): Promise<InvitationWithInviter[]> {
        return this.InvitationDatasource.listByOrg(organizationId)
    }

    update(invitation: InvitationEntity, tx?: PrismaTransactionClient): Promise<InvitationEntity> {
        return this.InvitationDatasource.update(invitation, tx)
    }
}