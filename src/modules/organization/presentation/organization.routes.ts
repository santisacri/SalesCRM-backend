import { Router } from "express";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { createOrgSchema } from "./organization.schemas";
import { organizationController } from "../../../shared/container/organization.container";
import { authMiddleware } from "../../../shared/container/auth.container";


export class OrganizationRouter {

    static get routes() {
        const router = Router()

        router.post('/', [authMiddleware, validateBody(createOrgSchema)], organizationController.createOrg)
        router.get('/me', [authMiddleware], organizationController.getUserOrgs)

        return router
    }
}