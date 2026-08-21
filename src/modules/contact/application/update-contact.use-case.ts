import { CustomError } from "../../../shared/errors/custom-errors";
import { ErrorCode } from "../../../shared/errors/error-codes";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { ContactEntity } from "../domain/contact.entity";
import { IContactRepository } from "../domain/contact.repository.contract";
import { UpdateContactInput } from "../presentation/contact.schemas";

export interface IUpdateContactUseCase {
    execute(input: UpdateContactInput, contactId: string, ctx: OrgScopedCtx): Promise<ContactEntity>
}

export class UpdateContactUseCase implements IUpdateContactUseCase {

    constructor(
        private readonly contactRepo: IContactRepository,
    ) { }

    async execute(input: UpdateContactInput, contactId: string, ctx: OrgScopedCtx): Promise<ContactEntity> {
        const storedContact = await this.contactRepo.findById(contactId, ctx.organizationId)

        if (!storedContact) throw CustomError.notFound('Contact not found', ErrorCode.NOT_FOUND);

        if (ctx.role === MembershipRoleEnum.MEMBER && storedContact.ownerId !== ctx.userId) throw CustomError.forbidden("You can't update this contact", ErrorCode.FORBIDDEN);

        const updatedContact = await this.contactRepo.update(input, contactId, ctx.organizationId)

        return updatedContact
    }

}