import { Router } from "express";
import { AuthRouter } from "./modules/auth/presentation/auth.routes";
import { OrganizationRouter } from "./modules/organization/presentation/organization.routes";
import { ContactRouter } from "./modules/contact/presentation/contact.routes";
import { TeamRouter } from "./modules/team/presentation/team.routes";


export class AppRouter {
    static get routes(): Router {
        const router = Router()

        router.use('/api/auth', AuthRouter.routes)
        router.use('/api/org', OrganizationRouter.routes)
        router.use('/api/contact', ContactRouter.routes)
        router.use('/api/team', TeamRouter.routes)

        return router
    }
}