import { NextFunction, Request, Response } from "express"
import { InviteToOrganizationInput } from "./invitation.schemas"
import { IInviteToOrganizationUseCase } from "../application/invite-to-organization.use-case"
import getContext from "../../../shared/helpers/get-context"

type UseCases = {
    invite: IInviteToOrganizationUseCase
}

export class InvitationController {

    constructor(
        private readonly useCases: UseCases
    ) { }

    invite = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body as InviteToOrganizationInput
            const ctx = getContext(req)

            const invitation = await this.useCases.invite.execute(email, ctx)

            res.status(201).json({ invitation })
        } catch (error) {
            next(error)
        }
    }
}