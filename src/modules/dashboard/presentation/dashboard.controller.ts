import { NextFunction, Request, Response } from "express"
import getContext from "../../../shared/helpers/get-context"
import { IGetDashboardSummaryUseCase } from "../application/get-dashboard-summary.use-case"

type UseCases = {
    getSummary: IGetDashboardSummaryUseCase
}

export class DashboardController {

    constructor(
        private readonly useCases: UseCases
    ) { }


    getSummary = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { teamId } = req.query as { teamId?: string }
            const ctx = getContext(req)

            const summary = await this.useCases.getSummary.execute({ teamId }, ctx)

            res.status(200).json({ summary })
        } catch (error) {
            next(error)
        }
    }
}