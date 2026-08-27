import { OrgScopedCtx } from "../../../shared/types/context.types";
import { TokenUtil } from "../../../shared/utils/token.util";
import { IInvitationDatasource } from "../domain/invitation.datasource.contract";
import { IInvitationRepository } from "../domain/invitation.repository.contract";
import { InvitationEntity } from "../domain/invitation.entity";

export class InvitationRepository implements IInvitationRepository {

    constructor(
        private readonly InvitationDatasource: IInvitationDatasource
    ) { }

    async create(email: string, invitedByCtx: OrgScopedCtx): Promise<{ dbRecord: InvitationEntity, hashedToken: string }> {

        const token = TokenUtil.generateToken()
        const hashedToken = TokenUtil.hash(token)

        const dbRecord = await this.InvitationDatasource.create(email, token, invitedByCtx)

        return { dbRecord, hashedToken }
    }
    findByToken(token: string): Promise<InvitationEntity | null> {
        return this.InvitationDatasource.findByToken(token)
    }
    listByOrg(organizationId: string): Promise<InvitationEntity[]> {
        return this.InvitationDatasource.listByOrg(organizationId)
    }
    update(invitation: InvitationEntity): Promise<InvitationEntity> {
        return this.InvitationDatasource.update(invitation)
    }

}