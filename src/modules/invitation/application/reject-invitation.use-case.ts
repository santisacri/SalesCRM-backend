import { CustomError } from "../../../shared/errors/custom-errors";
import { InvitationEntity, InvitationStatusEnum } from "../domain/invitation.entity";
import { IInvitationRepository } from "../domain/invitation.repository.contract";

export interface IRejectInvitationUseCase {
    execute(identifier: { token: string } | { invitationId: string, email: string }): Promise<InvitationEntity>
}

export class RejectInvitationUseCase implements IRejectInvitationUseCase {

    constructor(
        private readonly invitationRepo: IInvitationRepository
    ) { }

    async execute(identifier: { token: string } | { invitationId: string, email: string }): Promise<InvitationEntity> {

        const invitation = 'token' in identifier
            ? await this.invitationRepo.findByToken(identifier.token)
            : await this.invitationRepo.findById(identifier.invitationId);

        if (!invitation || invitation.status !== InvitationStatusEnum.PENDING) {
            throw CustomError.badRequest('Invalid Invitation');
        }

        if ('userEmail' in identifier && identifier.userEmail !== invitation.email) {
            throw CustomError.forbidden("Invalid operation")
        }

        const rejectedInvitation = InvitationEntity.fromObject({ ...invitation, status: InvitationStatusEnum.REJECTED })

        return this.invitationRepo.update(rejectedInvitation)
    }
}