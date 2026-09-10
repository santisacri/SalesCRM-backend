import { PrismaClient } from "../../../generated/prisma/client";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { ITeamDatasource } from "../domain/team.datasource.contract";
import { TeamEntity } from "../domain/team.entity";


export class TeamDatasource implements ITeamDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    async create(name: string, adminId: string, organizationId: string): Promise<TeamEntity> {
        try {
            const team = await this.prisma.team.create({
                data: { name, adminId, organizationId }
            })

            return TeamEntity.fromObject(team)
        } catch (error) {
            handlePrismaError(error)
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

    async listByOrg(organizationId: string): Promise<TeamEntity[]> {
        try {
            const teams = await this.prisma.team.findMany({
                where: { organizationId }
            })

            return teams.map(TeamEntity.fromObject)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async update(team: TeamEntity): Promise<TeamEntity> {
        try {
            const updatedTeam = await this.prisma.team.update({
                where: { id: team.id },
                data: { ...team }
            })

            return TeamEntity.fromObject(updatedTeam)
        } catch (error) {
            handlePrismaError(error)
        }
    }

}