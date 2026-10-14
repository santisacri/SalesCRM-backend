import { Router } from "express";
import { authMiddleware } from "../../../shared/container/auth.container";
import requireOrgMiddleware from "../../../shared/middlewares/require-org.middleware";
import requireTeamMiddleware from "../../../shared/middlewares/require-team.middleware";
import { dashboardController } from "../../../shared/container/dashboard.container";


export class DashboardRouter {

    static get routes(): Router {
        const router = Router()

        router.get('/summary', [authMiddleware, requireOrgMiddleware, requireTeamMiddleware], dashboardController.getSummary)

        return router
    }
}