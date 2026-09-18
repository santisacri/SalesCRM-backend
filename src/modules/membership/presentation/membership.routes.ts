import { Router } from "express";
import { membershipController } from "../../../shared/container/membership.container";
import { authMiddleware } from "../../../shared/container/auth.container";
import requireOrgMiddleware from "../../../shared/middlewares/require-org.middleware";
import { atLeastAdminMiddleware } from "../../../shared/middlewares/at-least-admin.middleware";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { changeAdminSchema } from "./membership.schemas";


export class MembershipRouter {

    static get routes() {
        const router = Router()

        router.get('/', [authMiddleware, requireOrgMiddleware], membershipController.getOrganizationMembers)
        router.patch('/change-admin', [authMiddleware, requireOrgMiddleware, atLeastAdminMiddleware, validateBody(changeAdminSchema)], membershipController.changeAdmin)
        router.patch('/:memberId', [authMiddleware, requireOrgMiddleware, atLeastAdminMiddleware], membershipController.kickMember)
        router.patch('/:membershipId/assign-team/:teamId', [authMiddleware, requireOrgMiddleware, atLeastAdminMiddleware], membershipController.assignMemberToTeam)

        return router
    }
}