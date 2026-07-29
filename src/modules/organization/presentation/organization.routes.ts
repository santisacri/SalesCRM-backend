import { Router } from "express";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { createOrgSchema } from "./organization.schemas";
import { organizationController } from "../../../shared/container/organization.container";
import { authMiddleware } from "../../../shared/container/auth.container";


export class OrganizationRouter {

    static get Routes(): Router {
        const router = Router()

        router.post('/', [authMiddleware, validateBody(createOrgSchema)], organizationController.createOrg)

        return router
    }
}