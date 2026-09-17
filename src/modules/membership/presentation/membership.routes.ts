import { Router } from "express";
import { membershipController } from "../../../shared/container/membership.container";
import { authMiddleware } from "../../../shared/container/auth.container";
import requireOrgMiddleware from "../../../shared/middlewares/require-org.middleware";
import { atLeastAdminMiddleware } from "../../../shared/middlewares/at-least-admin.middleware";


export class MembershipRouter {

    static get routes() {
        const router = Router()

        router.get('/', [authMiddleware, requireOrgMiddleware], membershipController.getOrganizationMembers)
        router.patch('/:memberId', [authMiddleware, requireOrgMiddleware, atLeastAdminMiddleware], membershipController.kickMember)
        router.patch('/:membershipId/assign-team/:teamId', [authMiddleware, requireOrgMiddleware, atLeastAdminMiddleware], membershipController.kickMember)

        return router
    }
}