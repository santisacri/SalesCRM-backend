import { CustomError } from "../../../shared/errors/custom-errors";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { IContactRepository } from "../../contact/domain/contact.repository.contract";
import { IDealRepository } from "../../deal/domain/deal.repository.contract";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { ActivityEntity, ActivityTypeEnum } from "../domain/activity.entity";
import { IActivityRepository } from "../domain/activity.repository.contract";
import { CreateNoteInput } from "../presentation/activity.schemas";

export interface ICreateNoteUseCase {
    execute(input: CreateNoteInput, ctx: OrgScopedCtx): Promise<ActivityEntity>
}

export class CreateNoteUseCase implements ICreateNoteUseCase {

    constructor(
        private readonly activityRepo: IActivityRepository,
        private readonly contactRepo: IContactRepository,
        private readonly dealRepo: IDealRepository,
    ) { }

    async execute(input: CreateNoteInput, ctx: OrgScopedCtx): Promise<ActivityEntity> {
        const [contact, deal] = await Promise.all([
            this.contactRepo.findById(input.contactId, ctx.organizationId),
            input.dealId ? this.dealRepo.findById(input.dealId, ctx.organizationId) : null
        ])

        if (!contact || contact.deletedAt) throw CustomError.notFound('Contact not found');

        if (input.dealId && !deal) throw CustomError.notFound('Deal not found');

        if (deal && deal.contactId !== contact.id) {
            throw CustomError.badRequest('The deal does not belong to this contact')
        }

        if (deal && ctx.role !== MembershipRoleEnum.OWNER && deal.teamId !== ctx.teamId) {
            throw CustomError.forbidden()
        }

        return this.activityRepo.create({
            organizationId: ctx.organizationId,
            contactId: contact.id,
            createdById: ctx.userId,
            type: ActivityTypeEnum.NOTE,
            content: { text: input.text },
            dealId: deal ? deal.id : null
        })
    }

}