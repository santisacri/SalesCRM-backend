import { Router } from "express";
import { authMiddleware } from "../../../shared/container/auth.container";
import requireOrgMiddleware from "../../../shared/middlewares/require-org.middleware";
import onlyOwnerMiddleware from "../../../shared/middlewares/only-owner.middleware";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { createTeamSchema } from "./team.schemas";
import { teamController } from "../../../shared/container/team.container";


export class TeamRouter {

    static get routes() {
        const router = Router()

        router.post('/', [authMiddleware, requireOrgMiddleware, onlyOwnerMiddleware, validateBody(createTeamSchema)], teamController.createTeam)
        // router.get('/')
        // router.put('/')


        return router
    }
}