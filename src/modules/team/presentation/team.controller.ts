import { Request, Response, NextFunction } from "express"
import getContext from "../../../shared/helpers/get-context"
import { ICreateTeamUseCase } from "../application/create-team.use-case"
import { IListOrganizationTeamsUseCase } from "../application/list-organization-teams.use-case"
import { IDeleteTeamUseCase } from "../application/delete-team.use-case"
import { IGetTeamDetailUseCase } from "../application/get-team-detail.use-case"


type UseCases = {
    createTeam: ICreateTeamUseCase
    listOrganizationTeams: IListOrganizationTeamsUseCase
    deleteTeam: IDeleteTeamUseCase
    getTeamDetail: IGetTeamDetailUseCase
}

export class TeamController {

    constructor(
        private readonly useCases: UseCases
    ) { }


    createTeam = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body
            const ctx = getContext(req)

            const team = await this.useCases.createTeam.execute(body, ctx)

            res.status(201).json({ team })
        } catch (error) {
            next(error)
        }
    }

    listOrganizationTeams = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { organizationId } = getContext(req)

            const teams = await this.useCases.listOrganizationTeams.execute(organizationId)

            res.status(200).json({ teams })
        } catch (error) {
            next(error)
        }
    }

    getTeamDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ctx = getContext(req)
            const teamId = req.params.teamId as string

            const { members, team } = await this.useCases.getTeamDetail.execute(teamId, ctx)

            res.status(200).json({ team, members })
        } catch (error) {
            next(error)
        }
    }

    deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { organizationId } = getContext(req)
            const teamId = req.params.teamId as string

            const team = await this.useCases.deleteTeam.execute(teamId, organizationId)

            res.status(200).json({ team })
        } catch (error) {
            next(error)
        }
    }
}