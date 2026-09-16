import { DealStage, PrismaClient } from "../../../generated/prisma/client";
import { TeamGetPayload, TeamInclude } from "../../../generated/prisma/models";
import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { ErrorCode } from "../../../shared/errors/error-codes";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { ITeamDatasource, ITeamSummary } from "../domain/team.datasource.contract";
import { TeamEntity } from "../domain/team.entity";

type TeamWithRelations = TeamGetPayload<{
    include: {
        admin: { select: { name: true } }
        _count: { select: { members: true } }
        deals: { select: { amount: true } }
    }
}>

export class TeamDatasource implements ITeamDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    private teamSummaryInclude() {
        return {
            admin: { select: { name: true } },
            _count: { select: { members: true } },
            deals: {
                where: { stage: { notIn: [DealStage.WON, DealStage.LOST] } },
                select: { amount: true }
            }
        } satisfies TeamInclude
    }

    private toSummary(team: TeamWithRelations): ITeamSummary {
        const openDeals = team.deals

        return {
            id: team.id,
            organizationId: team.organizationId,
            name: team.name,
            adminId: team.adminId,
            adminName: team.admin.name,
            memberCount: team._count.members,
            openDealsCount: openDeals.length,
            openDealsAmount: openDeals.reduce((sum, deal) => sum + Number(deal.amount), 0)
        }
    }

    async create(name: string, adminId: string, organizationId: string, tx?: PrismaTransactionClient): Promise<TeamEntity> {
        try {
            const client = tx ?? this.prisma
            const team = await client.team.create({
                data: { name, adminId, organizationId }
            })

            return TeamEntity.fromObject(team)
        } catch (error) {
            handlePrismaError(error, ErrorCode.USER_ALREADY_ADMIN)
        }
    }

    async getById(teamId: string, organizationId: string): Promise<TeamEntity> {
        try {
            const team = await this.prisma.team.findUniqueOrThrow({
                where: { id: teamId, organizationId }
            })

            return team
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async listByOrgWithSummary(organizationId: string): Promise<ITeamSummary[]> {
        try {
            const teams = await this.prisma.team.findMany({
                where: { organizationId, deletedAt: null },
                include: this.teamSummaryInclude()
            })

            return teams.map(this.toSummary)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async update(team: TeamEntity, tx?: PrismaTransactionClient): Promise<TeamEntity> {
        try {
            const client = tx ?? this.prisma
            const updatedTeam = await client.team.update({
                where: { id: team.id },
                data: { ...team }
            })

            return TeamEntity.fromObject(updatedTeam)
        } catch (error) {
            handlePrismaError(error)
        }
    }

}