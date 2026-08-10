import { CustomError } from "../../../shared/errors/custom-errors";
import { ErrorCode } from "../../../shared/errors/error-codes";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { ContactEntity } from "../domain/contact.entity";
import { IContactRepository } from "../domain/contact.repository.contract";
import { CreateContactInput } from "../presentation/contact.schemas";

type UserContext = {
    organizationId: string,
    userId: string,
    role: MembershipRoleEnum
}

export interface ICreateContactUseCase {
    execute(input: CreateContactInput, ctx: UserContext): Promise<ContactEntity>
}

export class CreateContactUseCase implements ICreateContactUseCase {

    constructor(
        private readonly contactRepo: IContactRepository
    ) { }

    async execute(input: CreateContactInput, ctx: UserContext): Promise<ContactEntity> {
        if (input.ownerId !== ctx.userId && ctx.role === MembershipRoleEnum.MEMBER) {
            throw CustomError.unauthorized("You can't assign a contact to another user", ErrorCode.INSUFFICIENT_ROLE)
        }

        const newContact = await this.contactRepo.create(input, ctx.organizationId)

        return newContact
    }

}