import { Router } from "express";
import { AuthRouter } from "./modules/auth/presentation/auth.routes";
import { OrganizationRouter } from "./modules/organization/presentation/organization.routes";
import { ContactRouter } from "./modules/contact/presentation/contact.routes";


export class AppRouter {
    static get routes(): Router {
        const router = Router()

        router.use('/api/auth', AuthRouter.routes)
        router.use('/api/org', OrganizationRouter.Routes)
        router.use('/api/contact', ContactRouter.Routes)

        return router
    }
}