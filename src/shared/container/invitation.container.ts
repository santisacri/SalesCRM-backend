import { AcceptInvitationUseCase } from "../../modules/invitation/application/accept-invitation.use-case";
import { InviteToOrganizationUseCase } from "../../modules/invitation/application/invite-to-organization.use-case";
import { RejectInvitationUseCase } from "../../modules/invitation/application/reject-invitation.use-case";
import { InvitationController } from "../../modules/invitation/presentation/invitation.controller";
import { mailQueueService } from "./queue.container";
import { invitationRepository, membershipRepository, organizationRepository, userRepository } from "./repositories.container";
import { hashService } from "./services.container";
import { transactionManager } from "./transaction-manager.container";

const invite = new InviteToOrganizationUseCase(invitationRepository, userRepository, organizationRepository, mailQueueService)
const acceptInvitation = new AcceptInvitationUseCase(invitationRepository, membershipRepository, userRepository, hashService, transactionManager)
const rejectInvitation = new RejectInvitationUseCase(invitationRepository)

export const invitationController = new InvitationController({ invite, acceptInvitation, rejectInvitation })