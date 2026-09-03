import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { InvitationWithInviter } from "./invitation.datasource.contract";
import { InvitationEntity } from "./invitation.entity";

export interface IInvitationRepository {
    create(email: string, invitedByCtx: OrgScopedCtx): Promise<{ dbRecord: InvitationEntity, rawToken: string }>
    findByToken(token: string): Promise<InvitationEntity | null>
    findById(id: string, organizationId: string): Promise<InvitationEntity | null>
    findByEmail(email: string): Promise<InvitationEntity[]>
    listByOrg(organizationId: string): Promise<InvitationWithInviter[]>
    update(invitation: InvitationEntity, tx?: PrismaTransactionClient): Promise<InvitationEntity>
}