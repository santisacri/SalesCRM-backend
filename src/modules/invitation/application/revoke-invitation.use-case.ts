import { CustomError } from "../../../shared/errors/custom-errors";
import { ErrorCode } from "../../../shared/errors/error-codes";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { InvitationEntity, InvitationStatusEnum } from "../domain/invitation.entity";
import { IInvitationRepository } from "../domain/invitation.repository.contract";

export interface IRevokeInvitationUseCase {
    execute(invitationId: string, ctx: OrgScopedCtx): Promise<InvitationEntity>
}

export class RevokeInvitationUseCase implements IRevokeInvitationUseCase {

    constructor(
        private readonly invitationRepo: IInvitationRepository
    ) { }

    async execute(invitationId: string, ctx: OrgScopedCtx): Promise<InvitationEntity> {
        const invitation = await this.invitationRepo.findById(invitationId)

        if (!invitation || invitation.organizationId !== ctx.organizationId) throw CustomError.badRequest("Invitation not found");

        if (ctx.role !== MembershipRoleEnum.OWNER && invitation.invitedById !== ctx.userId) {
            throw CustomError.forbidden("You can't revoke this invitation", ErrorCode.FORBIDDEN)
        }

        return this.invitationRepo.update({ ...invitation, status: InvitationStatusEnum.REVOKED })
    }

}