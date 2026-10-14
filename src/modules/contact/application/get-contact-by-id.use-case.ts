import { CustomError } from "../../../shared/errors/custom-errors";
import { ErrorCode } from "../../../shared/errors/error-codes";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { ActivityEntity } from "../../activity/domain/activity.entity";
import { IActivityRepository } from "../../activity/domain/activity.repository.contract";
import { DealEntity } from "../../deal/domain/deal.entity";
import { IDealRepository } from "../../deal/domain/deal.repository.contract";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { ContactEntity } from "../domain/contact.entity";
import { IContactRepository } from "../domain/contact.repository.contract";

export interface IGetContactByIdUseCase {
    execute(contactId: string, ctx: OrgScopedCtx): Promise<{
        contact: ContactEntity,
        deals: DealEntity[],
        activities: ActivityEntity[],
        hasMoreActivities: boolean
    }>
}

export class GetContactByIdUseCase implements IGetContactByIdUseCase {

    constructor(
        private readonly contactRepo: IContactRepository,
        private readonly dealRepo: IDealRepository,
        private readonly activityRepo: IActivityRepository
    ) { }

    async execute(contactId: string, ctx: OrgScopedCtx): Promise<{ contact: ContactEntity, deals: DealEntity[], activities: ActivityEntity[], hasMoreActivities: boolean }> {
        const contact = await this.contactRepo.findById(contactId, ctx.organizationId)

        if (!contact) throw CustomError.notFound('Contact not found', ErrorCode.NOT_FOUND);

        const teamScope = ctx.role === MembershipRoleEnum.OWNER ? null : ctx.teamId

        const [deals, activityPage] = await Promise.all([
            this.dealRepo.findManyByContactId(contact.id, ctx.organizationId),
            this.activityRepo.listByContactId(contactId, ctx.organizationId, teamScope, { limit: 5 })
        ])

        return {
            contact,
            deals,
            activities: activityPage.activities,
            hasMoreActivities: activityPage.nextCursor !== null
        }
    }

}