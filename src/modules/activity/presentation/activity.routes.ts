import { Router } from "express";
import { activityController } from "../../../shared/container/activity.container";
import { authMiddleware } from "../../../shared/container/auth.container";
import requireOrgMiddleware from "../../../shared/middlewares/require-org.middleware";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { createNoteSchema } from "./activity.schemas";
import requireTeamMiddleware from "../../../shared/middlewares/require-team.middleware";


export class ActivityRouter {

    static get routes(): Router {
        const router = Router()

        router.post('/', [authMiddleware, requireOrgMiddleware, validateBody(createNoteSchema)], activityController.createNote)
        router.get('/:contactId', [authMiddleware, requireOrgMiddleware, requireTeamMiddleware], activityController.listActivitiesByContact)


        return router
    }
}