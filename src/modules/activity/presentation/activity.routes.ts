import { Router } from "express";
import { activityController } from "../../../shared/container/activity.container";
import { authMiddleware } from "../../../shared/container/auth.container";
import requireOrgMiddleware from "../../../shared/middlewares/require-org.middleware";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { createNoteSchema } from "./activity.schemas";


export class ActivityRouter {

    get routes(): Router {
        const router = Router()

        router.post('/', [authMiddleware, requireOrgMiddleware, validateBody(createNoteSchema)], activityController.createNote)


        return router
    }
}