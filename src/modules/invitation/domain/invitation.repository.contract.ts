import { OrgScopedCtx } from "../../../shared/types/context.types";
import { InvitationEntity } from "./invitation.entity";

export interface IInvitationRepository {
    create(email: string, invitedByCtx: OrgScopedCtx): Promise<{dbRecord: InvitationEntity, hashedToken: string}>
    findByToken(token: string): Promise<InvitationEntity | null>
    listByOrg(organizationId: string): Promise<InvitationEntity[]>
    update(invitation: InvitationEntity): Promise<InvitationEntity>
}