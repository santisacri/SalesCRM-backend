import { Router } from "express";
import { membershipController } from "../../../shared/container/membership.container";
import { authMiddleware } from "../../../shared/container/auth.container";
import requireOrgMiddleware from "../../../shared/middlewares/require-org.middleware";


export class MembershipRouter {

    static get routes() {
        const router = Router()

        router.get('/', [authMiddleware, requireOrgMiddleware], membershipController.getOrganizationMembers)

        return router
    }
}