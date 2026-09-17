import { Router } from "express";
import { authMiddleware } from "../../../shared/container/auth.container";
import requireOrgMiddleware from "../../../shared/middlewares/require-org.middleware";
import onlyOwnerMiddleware from "../../../shared/middlewares/only-owner.middleware";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { createTeamSchema } from "./team.schemas";
import { teamController } from "../../../shared/container/team.container";
import { atLeastAdminMiddleware } from "../../../shared/middlewares/at-least-admin.middleware";


export class TeamRouter {

    static get routes() {
        const router = Router()

        router.post('/', [authMiddleware, requireOrgMiddleware, onlyOwnerMiddleware, validateBody(createTeamSchema)], teamController.createTeam)
        router.get('/', [authMiddleware, requireOrgMiddleware, onlyOwnerMiddleware], teamController.listOrganizationTeams)
        router.get('/:teamId/detail', [authMiddleware, requireOrgMiddleware, atLeastAdminMiddleware], teamController.getTeamDetail)
        router.delete('/:teamId', [authMiddleware, requireOrgMiddleware, onlyOwnerMiddleware], teamController.deleteTeam)


        return router
    }
}