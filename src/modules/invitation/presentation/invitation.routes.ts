import { Router } from "express";
import { invitationController } from "../../../shared/container/invitation.container";
import { authMiddleware } from "../../../shared/container/auth.container";
import requireOrgMiddleware from "../../../shared/middlewares/require-org.middleware";
import { atLeastAdminMiddleware } from "../../../shared/middlewares/at-least-admin.middleware";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { inviteToOrganizationSchema } from "./invitation.schemas";


export class InvitationRouter {

    static get routes() {
        const router = Router()

        router.post('/', [authMiddleware, requireOrgMiddleware, atLeastAdminMiddleware, validateBody(inviteToOrganizationSchema)], invitationController.invite)

        return router
    }
}