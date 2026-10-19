import { resolveTeamScope } from "../../../shared/helpers/resolve-team-scope";
import { OrgScopedCtx } from "../../../shared/types/context.types";
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
        const resolvedTeamId = resolveTeamScope(teamId, ctx)
        return this.dealRepo.listByStage(ctx.organizationId, resolvedTeamId)
    }
}