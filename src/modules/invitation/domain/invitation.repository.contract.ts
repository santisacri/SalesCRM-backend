import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { InvitationEntity } from "./invitation.entity";

export interface IInvitationRepository {
    create(email: string, invitedByCtx: OrgScopedCtx): Promise<{ dbRecord: InvitationEntity, rawToken: string }>
    findByToken(token: string): Promise<InvitationEntity | null>
    findById(id: string): Promise<InvitationEntity | null>
    listByOrg(organizationId: string): Promise<InvitationEntity[]>
    update(invitation: InvitationEntity, tx?: PrismaTransactionClient): Promise<InvitationEntity>
}