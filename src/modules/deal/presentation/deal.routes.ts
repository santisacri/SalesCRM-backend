import { Router } from "express";
import { dealController } from "../../../shared/container/deal.container";
import { authMiddleware } from "../../../shared/container/auth.container";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { createDealSchema } from "./deal.schemas";
import requireTeamMiddleware from "../../../shared/middlewares/require-team.middleware";
import requireOrgMiddleware from "../../../shared/middlewares/require-org.middleware";



export class DealRouter {


    static get routes() {
        const router = Router()

        router.post('/', [authMiddleware, requireOrgMiddleware, requireTeamMiddleware, validateBody(createDealSchema)], dealController.createDeal)


        return router
    }
}