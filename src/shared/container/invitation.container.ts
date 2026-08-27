import { InviteToOrganizationUseCase } from "../../modules/invitation/application/invite-to-organization.use-case";
import { InvitationController } from "../../modules/invitation/presentation/invitation.controller";
import { mailQueueService } from "./queue.container";
import { invitationRepository, organizationRepository, userRepository } from "./repositories.container";

const invite = new InviteToOrganizationUseCase(invitationRepository, userRepository, organizationRepository, mailQueueService)

export const invitationController = new InvitationController({ invite })