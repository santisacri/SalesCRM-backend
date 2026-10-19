import { resolveTeamScope } from "../../../shared/helpers/resolve-team-scope";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { daysAgo, startOfMonthAR } from "../../../shared/utils/date-range";
import { IContactRepository } from "../../contact/domain/contact.repository.contract";
import { StageStats } from "../../deal/domain/deal.datasource.contract";
import { DealStageEnum } from "../../deal/domain/deal.entity";
import { IDealRepository } from "../../deal/domain/deal.repository.contract";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";

const CLOSED_WINDOW_DAYS = 30
const OPEN_STAGES = [DealStageEnum.QUALIFIED, DealStageEnum.PROPOSAL, DealStageEnum.NEGOTIATION]

export type DashboardSummary = {
    openDeals: { count: number; amount: number }
    wonThisMonth: { count: number; amount: number }
    conversionRate: number | null
    newContacts: number
    funnel: StageStats[]
}

export interface IGetDashboardSummaryUseCase {
    execute(input: { teamId?: string }, ctx: OrgScopedCtx): Promise<DashboardSummary>
}

export class GetDashboardSummaryUseCase implements IGetDashboardSummaryUseCase {

    constructor(
        private readonly dealRepo: IDealRepository,
        private readonly contactRepo: IContactRepository
    ) { }

    async execute(input: { teamId?: string }, ctx: OrgScopedCtx): Promise<DashboardSummary> {
        const teamScope = resolveTeamScope(input.teamId, ctx)
        const ownerScope = ctx.role === MembershipRoleEnum.MEMBER ? ctx.userId : null

        const [rows, wonThisMonth, newContacts] = await Promise.all([
            this.dealRepo.statsByStage(ctx.organizationId, teamScope, ownerScope, daysAgo(CLOSED_WINDOW_DAYS)),
            this.dealRepo.wonSince(ctx.organizationId, teamScope, ownerScope, startOfMonthAR()),
            this.contactRepo.countCreatedSince(ctx.organizationId, ownerScope, startOfMonthAR()),
        ])

        const byStage = new Map(rows.map(r => [r.stage, r]))
        const statsOf = (stage: DealStageEnum): StageStats => byStage.get(stage) ?? { stage, count: 0, amount: 0 };

        const openDeals = OPEN_STAGES.reduce(
            (acc, stage) => ({
                count: acc.count + statsOf(stage).count,
                amount: acc.amount + statsOf(stage).amount,
            }),
            { count: 0, amount: 0 }
        )

        const won = statsOf(DealStageEnum.WON).count
        const lost = statsOf(DealStageEnum.LOST).count

        return {
            openDeals,
            wonThisMonth,
            conversionRate: won + lost === 0 ? null : won / (won + lost),
            newContacts,
            funnel: [...OPEN_STAGES, DealStageEnum.WON].map(statsOf),
        }
    }
}