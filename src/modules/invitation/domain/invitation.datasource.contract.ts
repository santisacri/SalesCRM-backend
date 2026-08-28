import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { InvitationEntity } from "./invitation.entity";

export interface IInvitationDatasource {
    create(email: string, token: string, invitedByCtx: OrgScopedCtx): Promise<InvitationEntity>
    findByToken(token: string): Promise<InvitationEntity | null>
    findById(id: string): Promise<InvitationEntity | null>
    findByEmail(email: string): Promise<InvitationEntity[]>
    listByOrg(organizationId: string): Promise<InvitationEntity[]>
    update(invitation: InvitationEntity, tx?: PrismaTransactionClient): Promise<InvitationEntity>
}