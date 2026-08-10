import { Router } from "express";
import { conctactController } from "../../../shared/container/contact.container";
import { authMiddleware } from "../../../shared/container/auth.container";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { createContactSchema } from "./contact.schemas";


export class ContactRouter {

    static get Routes(): Router {
        const router = Router()

        router.post('/', [authMiddleware, validateBody(createContactSchema)] ,conctactController.createContact)

        return router
    }
}