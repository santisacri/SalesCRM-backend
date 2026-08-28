import { NextFunction, Request, Response } from "express"
import { InviteToOrganizationInput, RegisterDataInput } from "./invitation.schemas"
import { IInviteToOrganizationUseCase } from "../application/invite-to-organization.use-case"
import getContext from "../../../shared/helpers/get-context"
import { IAcceptInvitationUseCase } from "../application/accept-invitation.use-case"

type UseCases = {
    invite: IInviteToOrganizationUseCase,
    acceptInvitation: IAcceptInvitationUseCase
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

    acceptInvitation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const registrationData = req.body as RegisterDataInput
            const token = req.params.token as string

            const membership = await this.useCases.acceptInvitation.execute(token, registrationData)

            res.status(201).json({ membership })
        } catch (error) {
            next(error)
        }
    }
}