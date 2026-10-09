import { REOPEN_DEAL_GRACE_PERIOD_MS } from "../../../shared/config/constants";
import { ITransactionManager } from "../../../shared/database/transaction-manager";
import { CustomError } from "../../../shared/errors/custom-errors";
import { ErrorCode } from "../../../shared/errors/error-codes";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { ActivityTypeEnum } from "../../activity/domain/activity.entity";
import { IActivityRepository } from "../../activity/domain/activity.repository.contract";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { DealEntity, DealStageEnum } from "../domain/deal.entity";
import { IDealRepository } from "../domain/deal.repository.contract";

export interface IUpdateDealStageUseCase {
    execute(dealId: string, newStage: DealStageEnum, ctx: OrgScopedCtx): Promise<DealEntity>
}

export class UpdateDealStageUseCase implements IUpdateDealStageUseCase {

    constructor(
        private readonly dealRepo: IDealRepository,
        private readonly activityRepo: IActivityRepository,
        private readonly txManager: ITransactionManager,
    ) { }

    async execute(dealId: string, newStage: DealStageEnum, ctx: OrgScopedCtx): Promise<DealEntity> {
        const deal = await this.dealRepo.findById(dealId, ctx.organizationId)

        if (!deal) throw CustomError.notFound("Deal not found");

        if ((ctx.role === MembershipRoleEnum.MEMBER && deal.ownerId !== ctx.userId) ||
            (ctx.role === MembershipRoleEnum.ADMIN && deal.teamId !== ctx.teamId)) {
            throw CustomError.forbidden("You don't have access to this resource")
        }

        if (deal.stage === newStage) return deal;

        const closedStages = [DealStageEnum.WON, DealStageEnum.LOST]
        const wasClosed = closedStages.includes(deal.stage)
        const isClosing = closedStages.includes(newStage)

        if (wasClosed && ctx.role === MembershipRoleEnum.MEMBER) {
            const isWithinGracePeriod =
                deal.closedAt !== null &&
                Date.now() - deal.closedAt.getTime() < REOPEN_DEAL_GRACE_PERIOD_MS

            if (!isWithinGracePeriod) {
                throw CustomError.forbidden("Closed deals can only be changed by an admin", ErrorCode.INSUFFICIENT_ROLE)
            }
        }

        return this.txManager.run(async (tx) => {
            const updatedDeal = await this.dealRepo.update({
                ...deal,
                stage: newStage,
                closedAt: isClosing ? new Date() : null
            }, tx)

            await this.activityRepo.create({
                contactId: deal.contactId,
                createdById: ctx.userId,
                dealId,
                organizationId: deal.organizationId,
                type: ActivityTypeEnum.STAGE_CHANGE,
                content: { from: deal.stage, to: updatedDeal.stage }
            }, tx)

            return updatedDeal
        })
    }

}