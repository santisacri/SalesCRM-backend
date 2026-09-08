import { NextFunction, Request, Response } from "express"
import { IGetOrganizationMembersUseCase } from "../application/get-organization-members.use-case"
import getContext from "../../../shared/helpers/get-context"
import { StatusQueryParamSchema } from "./membership.schemas"

type UseCases = {
    getOrganizationMembers: IGetOrganizationMembersUseCase
}

export class MembershipController {

    constructor(
        private readonly useCases: UseCases
    ) { }

    getOrganizationMembers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const status = StatusQueryParamSchema.parse(req.query.status)
            const { organizationId } = getContext(req)
            const members = await this.useCases.getOrganizationMembers.execute(organizationId, status)

            res.json({ members })
        } catch (error) {
            next(error)
        }
    }
}