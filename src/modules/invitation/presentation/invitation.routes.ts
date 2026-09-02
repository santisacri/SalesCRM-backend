import { Router } from "express";
import { invitationController } from "../../../shared/container/invitation.container";
import { authMiddleware } from "../../../shared/container/auth.container";
import requireOrgMiddleware from "../../../shared/middlewares/require-org.middleware";
import { atLeastAdminMiddleware } from "../../../shared/middlewares/at-least-admin.middleware";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { inviteToOrganizationSchema, registerDataSchema } from "./invitation.schemas";


export class InvitationRouter {

    static get routes() {
        const router = Router()

        router.post('/', [authMiddleware, requireOrgMiddleware, atLeastAdminMiddleware, validateBody(inviteToOrganizationSchema)], invitationController.invite)
        router.post('/token/:token/accept', [validateBody(registerDataSchema)], invitationController.acceptInvitation)
        router.post('/token/:token/reject', invitationController.rejectInvitationWithToken)
        router.post('/:invitationId/reject', [authMiddleware], invitationController.rejectInvitationWithId)
        router.get('/me', [authMiddleware], invitationController.listInvitationsByUser)

        return router
    }
}