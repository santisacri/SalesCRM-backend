import { Router } from "express";
import { dealController } from "../../../shared/container/deal.container";
import { authMiddleware } from "../../../shared/container/auth.container";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { createDealSchema, updateDealSchema, updateDealStageSchema } from "./deal.schemas";
import requireTeamMiddleware from "../../../shared/middlewares/require-team.middleware";
import requireOrgMiddleware from "../../../shared/middlewares/require-org.middleware";



export class DealRouter {


    static get routes() {
        const router = Router()

        router.post('/', [authMiddleware, requireOrgMiddleware, requireTeamMiddleware, validateBody(createDealSchema)], dealController.createDeal)
        router.get('/', [authMiddleware, requireOrgMiddleware, requireTeamMiddleware], dealController.listDealsByStage)
        router.get('/:dealId', [authMiddleware, requireOrgMiddleware, requireTeamMiddleware], dealController.getDealDetail)
        router.patch('/:dealId', [authMiddleware, requireOrgMiddleware, requireTeamMiddleware, validateBody(updateDealSchema)], dealController.updateDeal)
        router.patch('/:dealId/stage', [authMiddleware, requireOrgMiddleware, requireTeamMiddleware, validateBody(updateDealStageSchema)], dealController.updateDealStage)


        return router
    }
}