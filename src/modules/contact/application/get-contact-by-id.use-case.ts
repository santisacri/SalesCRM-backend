import { CustomError } from "../../../shared/errors/custom-errors";
import { ErrorCode } from "../../../shared/errors/error-codes";
import { ActivityEntity } from "../../activity/domain/activity.entity";
import { IActivityRepository } from "../../activity/domain/activity.repository.contract";
import { DealEntity } from "../../deal/domain/deal.entity";
import { IDealRepository } from "../../deal/domain/deal.repository.contract";
import { ContactEntity } from "../domain/contact.entity";
import { IContactRepository } from "../domain/contact.repository.contract";

export interface IGetContactByIdUseCase {
    execute(contactId: string, organizationId: string): Promise<{
        contact: ContactEntity,
        deals: DealEntity[],
        activities: ActivityEntity[]
    }>
}

export class GetContactByIdUseCase implements IGetContactByIdUseCase {

    constructor(
        private readonly contactRepo: IContactRepository,
        private readonly dealRepo: IDealRepository,
        private readonly activityRepo: IActivityRepository
    ) { }

    async execute(contactId: string, organizationId: string): Promise<{ contact: ContactEntity, deals: DealEntity[], activities: ActivityEntity[] }> {
        const contact = await this.contactRepo.findById(contactId, organizationId)

        if (!contact) throw CustomError.notFound('Contact not found', ErrorCode.NOT_FOUND);

        const [deals, activities] = await Promise.all([
            this.dealRepo.findManyByContactId(contact.id, organizationId),
            this.activityRepo.findManyByContactId(contactId, organizationId)
        ])

        return {
            contact,
            deals,
            activities
        }
    }

}