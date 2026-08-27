import { OrgScopedCtx } from "../../../shared/types/context.types";
import { TokenUtil } from "../../../shared/utils/token.util";
import { IInvitationDatasource } from "../domain/invitation.datasource.contract";
import { IInvitationRepository } from "../domain/invitation.repository.contract";
import { InvitationEntity } from "../domain/invitation.entity";

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
    listByOrg(organizationId: string): Promise<InvitationEntity[]> {
        return this.InvitationDatasource.listByOrg(organizationId)
    }
    update(invitation: InvitationEntity): Promise<InvitationEntity> {
        return this.InvitationDatasource.update(invitation)
    }

}