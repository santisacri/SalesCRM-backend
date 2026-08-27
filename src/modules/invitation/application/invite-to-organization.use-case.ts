import { IMailQueueService } from "../../../shared/queue/mail/mail-queue.service.contract";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { IOrganizationRepository } from "../../organization/domain/organization.repository.contract";
import { IUserRepository } from "../../user/domain/user.repository.contract";
import { IInvitationRepository } from "../domain/invitation.repository.contract";
import { InvitationEntity } from "../domain/invitation.entity";

export interface IInviteToOrganizationUseCase {
    execute(email: string, userCtx: OrgScopedCtx): Promise<InvitationEntity>
}

export class InviteToOrganizationUseCase implements IInviteToOrganizationUseCase {

    constructor(
        private readonly invitationRepo: IInvitationRepository,
        private readonly userRepo: IUserRepository,
        private readonly organizationRepo: IOrganizationRepository,
        private readonly mailQueue: IMailQueueService
    ) { }

    async execute(email: string, userCtx: OrgScopedCtx): Promise<InvitationEntity> {

        const [{ dbRecord, rawToken }, user, organization] = await Promise.all([
            await this.invitationRepo.create(email, userCtx),
            await this.userRepo.getById(userCtx.userId),
            await this.organizationRepo.getById(userCtx.organizationId)
        ])

        await this.mailQueue.enqueue("send-invitation-email", {
            to: email,
            invitedByName: user.name,
            organizationName: organization.name,
            rawToken
        })

        return dbRecord
    }

}