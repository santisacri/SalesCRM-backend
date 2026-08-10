import { Request, Response, NextFunction } from "express"
import { CreateOrgInput } from "./organization.schemas"
import { ICreateOrganizationUseCase } from "../application/create-organization.use-case"
import { IGetUserOrganizationsUseCase } from "../application/get-user-organizations.use-case"

type UseCases = {
    createOrg: ICreateOrganizationUseCase,
    getUserOrganizations: IGetUserOrganizationsUseCase
}

export class OrganizationController {

    constructor(
        private readonly useCases: UseCases
    ) { }

    createOrg = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.entity.id
            const { name } = req.body as CreateOrgInput

            const organization = await this.useCases.createOrg.execute(name, userId)

            res.status(201).json({ organization })
        } catch (error) {
            next(error)
        }
    }

    getUserOrgs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.entity.id

            const organizations = await this.useCases.getUserOrganizations.execute(userId)

            res.status(201).json({ organizations })
        } catch (error) {
            next(error)
        }
    }
}