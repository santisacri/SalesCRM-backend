import { NextFunction, Request, Response } from "express"
import { CreateDealInput } from "./deal.schemas"
import getContext from "../../../shared/helpers/get-context"
import { ICreateDealUseCase } from "../application/create-deal.use-case"
import { IListDealsByStageUseCase } from "../application/list-deals-by-stage.use-case"
import { IGetDealDetail } from "../application/get-deal-detail.use-case"
import { CustomError } from "../../../shared/errors/custom-errors"

type UseCases = {
    createDeal: ICreateDealUseCase
    listDealsByStage: IListDealsByStageUseCase
    getDealDetail: IGetDealDetail
}

export class DealController {

    constructor(
        private readonly useCases: UseCases
    ) { }

    createDeal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = req.body as CreateDealInput
            const context = getContext(req)

            const deal = await this.useCases.createDeal.execute(input, context)

            res.status(201).json({ deal })
        } catch (error) {
            next(error)
        }
    }

    listDealsByStage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const teamId = req.query.teamId as string | undefined
            const context = getContext(req)

            const deals = await this.useCases.listDealsByStage.execute(context, teamId)

            res.json({ ...deals })
        } catch (error) {
            next(error)
        }
    }

    getDealDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dealId = req.params.dealId as string | undefined
            const context = getContext(req)

            if (!dealId) throw CustomError.badRequest('Missing dealId');

            const { deal, activities } = await this.useCases.getDealDetail.execute(dealId, context)

            res.json({ deal, activities })
        } catch (error) {
            next(error)
        }
    }
}