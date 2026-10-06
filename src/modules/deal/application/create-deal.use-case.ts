import { CustomError } from "../../../shared/errors/custom-errors";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { DealEntity } from "../domain/deal.entity";
import { IDealRepository } from "../domain/deal.repository.contract";
import { CreateDealInput } from "../presentation/deal.schemas";

export interface ICreateDealUseCase {
    execute(data: CreateDealInput, ctx: OrgScopedCtx): Promise<DealEntity>
}

export class CreateDealUseCase implements ICreateDealUseCase {

    constructor(
        private readonly dealRepo: IDealRepository
    ) { }

    async execute(data: CreateDealInput, ctx: OrgScopedCtx): Promise<DealEntity> {
        if (ctx.role !== MembershipRoleEnum.OWNER && ctx.teamId !== data.teamId) {
            throw CustomError.forbidden("You can't assign deals to another team")
        }

        if (ctx.role === MembershipRoleEnum.MEMBER && ctx.userId !== data.ownerId) {
            throw CustomError.forbidden("You can't assign deals to other members")
        }

        return this.dealRepo.createDeal(data, ctx.organizationId)
    }

}