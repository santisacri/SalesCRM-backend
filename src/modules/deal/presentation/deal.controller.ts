import { NextFunction, Request, Response } from "express"
import { CreateDealInput, UpdateDealInput } from "./deal.schemas"
import getContext from "../../../shared/helpers/get-context"
import { ICreateDealUseCase } from "../application/create-deal.use-case"
import { IListDealsByStageUseCase } from "../application/list-deals-by-stage.use-case"
import { IGetDealDetail } from "../application/get-deal-detail.use-case"
import { CustomError } from "../../../shared/errors/custom-errors"
import { IUpdateDealUseCase } from "../application/update-deal.use-case"

type UseCases = {
    createDeal: ICreateDealUseCase
    listDealsByStage: IListDealsByStageUseCase
    getDealDetail: IGetDealDetail
    updateDeal: IUpdateDealUseCase
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

    updateDeal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dealId = req.params.dealId as string | undefined
            const input = req.body as UpdateDealInput
            const context = getContext(req)

            if (!dealId) throw CustomError.badRequest('Missing dealId');

            const deal = await this.useCases.updateDeal.execute(dealId, input, context)

            res.json({ deal })
        } catch (error) {
            next(error)
        }
    }
}