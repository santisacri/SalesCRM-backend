import { Router } from "express";
import { conctactController } from "../../../shared/container/contact.container";
import { authMiddleware } from "../../../shared/container/auth.container";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { createContactSchema, updateContactSchema } from "./contact.schemas";
import requireOrgMiddleware from "../../../shared/middlewares/require-org.middleware";


export class ContactRouter {

    static get Routes(): Router {
        const router = Router()

        router.post('/', [authMiddleware, validateBody(createContactSchema)], conctactController.createContact)
        router.get('/:contactId', [authMiddleware, requireOrgMiddleware], conctactController.getContactById)
        router.put('/:contactId', [authMiddleware, requireOrgMiddleware, validateBody(updateContactSchema)], conctactController.updateContact)

        return router
    }
}