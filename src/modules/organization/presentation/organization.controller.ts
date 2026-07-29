import { Request, Response, NextFunction } from "express"
import { TCreateOrg } from "./organization.schemas"
import { ICreateOrganizationUseCase } from "../application/create-organization.use-case"

type UseCases = {
    createOrg: ICreateOrganizationUseCase
}

export class OrganizationController {

    constructor(
        private readonly useCases: UseCases
    ) { }

    createOrg = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id!
            const { name } = req.body as TCreateOrg

            const organization = await this.useCases.createOrg.execute(name, userId)

            res.status(201).json({ organization })
        } catch (error) {
            next(error)
        }
    }
}