import { OrgScopedCtx } from "../../../shared/types/context.types";
import { InvitationEntity } from "./invitation.entity";

export interface IInvitationDatasource {
    create(email: string, token: string, invitedByCtx: OrgScopedCtx): Promise<InvitationEntity>
    findByToken(token: string): Promise<InvitationEntity | null>
    listByOrg(organizationId: string): Promise<InvitationEntity[]>
    update(invitation: InvitationEntity): Promise<InvitationEntity>
}