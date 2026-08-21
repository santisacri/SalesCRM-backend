import { CustomError } from "../../../shared/errors/custom-errors";
import { ErrorCode } from "../../../shared/errors/error-codes";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { IContactRepository } from "../domain/contact.repository.contract";

export interface IDeleteContactUseCase {
    execute(contactId: string, ctx: OrgScopedCtx): Promise<void>
}

export class DeleteContactUseCase implements IDeleteContactUseCase {

    constructor(
        private readonly contactRepo: IContactRepository
    ) { }

    async execute(contactId: string, ctx: OrgScopedCtx): Promise<void> {
        const storedContact = await this.contactRepo.findById(contactId, ctx.organizationId)

        if (!storedContact) throw CustomError.notFound('Contact not found', ErrorCode.NOT_FOUND);

        if (ctx.role === MembershipRoleEnum.MEMBER && storedContact.ownerId !== ctx.userId) {
            throw CustomError.forbidden("You can't delete this contact", ErrorCode.FORBIDDEN);
        }

        await this.contactRepo.deleteById(contactId, ctx.organizationId)
    }

}