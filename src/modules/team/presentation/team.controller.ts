import { Request, Response, NextFunction } from "express"
import getContext from "../../../shared/helpers/get-context"
import { ICreateTeamUseCase } from "../application/create-team.use-case"

type UseCases = {
    createTeam: ICreateTeamUseCase
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
}