import { OrgScopedCtx } from "../../../shared/types/context.types";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { DealsByStage } from "../domain/deal.datasource.contract";
import { IDealRepository } from "../domain/deal.repository.contract";


export interface IListDealsByStageUseCase {
    execute(ctx: OrgScopedCtx, teamId?: string): Promise<DealsByStage>
}

export class ListDealsByStageUseCase implements IListDealsByStageUseCase {

    constructor(
        private readonly dealRepo: IDealRepository
    ) { }

    async execute(ctx: OrgScopedCtx, teamId?: string): Promise<DealsByStage> {
        const resolvedTeamId = this.resolveTeamScope(teamId, ctx)
        return this.dealRepo.listByStage(ctx.organizationId, resolvedTeamId)
    }

    private resolveTeamScope(requestedTeamId: string | undefined, ctx: OrgScopedCtx): string | null {
        if (ctx.role === MembershipRoleEnum.OWNER) {
            return requestedTeamId ?? null
        }

        return ctx.teamId
    }

}