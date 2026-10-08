import { CustomError } from "../../../shared/errors/custom-errors";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { IContactRepository } from "../../contact/domain/contact.repository.contract";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { IMembershipRepository } from "../../membership/domain/membership.repository.contract";
import { DealEntity } from "../domain/deal.entity";
import { IDealRepository } from "../domain/deal.repository.contract";
import { UpdateDealInput } from "../presentation/deal.schemas";

export interface IUpdateDealUseCase {
    execute(dealId: string, data: UpdateDealInput, ctx: OrgScopedCtx): Promise<DealEntity>
}

export class UpdateDealUseCase implements IUpdateDealUseCase {

    constructor(
        private readonly dealRepo: IDealRepository,
        private readonly membershipRepo: IMembershipRepository,
        private readonly contactRepo: IContactRepository
    ) { }

    async execute(dealId: string, data: UpdateDealInput, ctx: OrgScopedCtx): Promise<DealEntity> {
        const deal = await this.dealRepo.findById(dealId, ctx.organizationId)

        if (!deal) throw CustomError.notFound("Deal not found");

        if ((ctx.role === MembershipRoleEnum.MEMBER && deal.ownerId !== ctx.userId) ||
            (ctx.role !== MembershipRoleEnum.OWNER && deal.teamId !== ctx.teamId)) {
            throw CustomError.forbidden("You don't have access to this resource")
        }

        const newOwnerId = data.ownerId

        if (newOwnerId !== undefined && newOwnerId !== deal.ownerId) {
            if (ctx.role === MembershipRoleEnum.MEMBER) throw CustomError.forbidden("You can't perform this action")

            const membership = await this.membershipRepo.findActive(newOwnerId, ctx.organizationId)

            if (!membership) throw CustomError.notFound("New owner not found");

            if (membership.teamId !== deal.teamId) throw CustomError.badRequest("Can't assign a deal to a member outside the deal's team")
        }

        if (data.contactId !== undefined && data.contactId !== deal.contactId) {
            const contact = await this.contactRepo.findById(data.contactId, ctx.organizationId)

            if (!contact) throw CustomError.notFound("Contact not found");
        }

        const updatedDeal = DealEntity.fromObject({
            ...deal,
            title: data.title ?? deal.title,
            amount: data.amount ?? deal.amount,
            contactId: data.contactId ?? deal.contactId,
            ownerId: data.ownerId ?? deal.ownerId,
            expectedCloseDate: data.expectedCloseDate !== undefined ? data.expectedCloseDate : deal.expectedCloseDate
        })

        return this.dealRepo.update(updatedDeal, ctx.organizationId)
    }
}

