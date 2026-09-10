import { Request, Response, NextFunction } from "express"
import getContext from "../../../shared/helpers/get-context"
import { ICreateTeamUseCase } from "../application/create-team.use-case"
import { IListOrganizationTeamsUseCase } from "../application/list-organization-teams.use-case"
import { UserEntity } from "../../user/domain/user.entity"

type UseCases = {
    createTeam: ICreateTeamUseCase
    listOrganizationTeams: IListOrganizationTeamsUseCase
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

            const teamsRecords = await this.useCases.listOrganizationTeams.execute(organizationId)

            const teams = teamsRecords.map(({ admin, team }) => {
                return {
                    team,
                    admin: UserEntity.toDto(admin)
                }
            })

            res.status(201).json({ teams })
        } catch (error) {
            next(error)
        }
    }
}