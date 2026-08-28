import { AcceptInvitationUseCase } from "../../modules/invitation/application/accept-invitation.use-case";
import { InviteToOrganizationUseCase } from "../../modules/invitation/application/invite-to-organization.use-case";
import { InvitationController } from "../../modules/invitation/presentation/invitation.controller";
import { mailQueueService } from "./queue.container";
import { invitationRepository, membershipRepository, organizationRepository, userRepository } from "./repositories.container";
import { transactionManager } from "./transaction-manager.container";

const invite = new InviteToOrganizationUseCase(invitationRepository, userRepository, organizationRepository, mailQueueService)
const acceptInvitation = new AcceptInvitationUseCase(invitationRepository, membershipRepository, userRepository, transactionManager)

export const invitationController = new InvitationController({ invite, acceptInvitation })