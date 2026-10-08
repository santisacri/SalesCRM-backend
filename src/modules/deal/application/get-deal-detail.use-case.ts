import { CustomError } from "../../../shared/errors/custom-errors";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { ActivityEntity } from "../../activity/domain/activity.entity";
import { IActivityRepository } from "../../activity/domain/activity.repository.contract";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { DealEntity } from "../domain/deal.entity";
import { IDealRepository } from "../domain/deal.repository.contract";

export interface IGetDealDetail {
    execute(dealId: string, ctx: OrgScopedCtx): Promise<{ deal: DealEntity, activities: ActivityEntity[] }>
}

export class GetDealDetail implements IGetDealDetail {

    constructor(
        private readonly dealRepo: IDealRepository,
        private readonly activityRepo: IActivityRepository
    ) { }

    async execute(dealId: string, ctx: OrgScopedCtx): Promise<{ deal: DealEntity; activities: ActivityEntity[]; }> {
        const deal = await this.dealRepo.findById(dealId, ctx.organizationId)

        if (!deal) throw CustomError.notFound("Deal not found");

        if ((ctx.role !== MembershipRoleEnum.OWNER && ctx.teamId !== deal.teamId) ||
            ctx.role === MembershipRoleEnum.MEMBER && deal.ownerId !== ctx.userId) {
            throw CustomError.forbidden("You don't have access to this resource")
        }

        const activities = await this.activityRepo.findManyByDealId(deal.id, ctx.organizationId)

        return { deal, activities }
    }

}