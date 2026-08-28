import { NextFunction, Request, Response } from "express"
import { InviteToOrganizationInput, RegisterDataInput } from "./invitation.schemas"
import { IInviteToOrganizationUseCase } from "../application/invite-to-organization.use-case"
import getContext from "../../../shared/helpers/get-context"
import { IAcceptInvitationUseCase } from "../application/accept-invitation.use-case"
import { IRejectInvitationUseCase } from "../application/reject-invitation.use-case"

type UseCases = {
    invite: IInviteToOrganizationUseCase,
    acceptInvitation: IAcceptInvitationUseCase
    rejectInvitation: IRejectInvitationUseCase
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

    rejectInvitationWithToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.params.token as string

            await this.useCases.rejectInvitation.execute({ token })

            res.status(201).json({ message: 'Invitation rejected' })
        } catch (error) {
            next(error)
        }
    }

    rejectInvitationWithId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const invitationId = req.params.invitationId as string
            const { email } = req.user.entity

            const rejectedInvitation = await this.useCases.rejectInvitation.execute({ invitationId, email })

            res.status(201).json({ rejectedInvitation })
        } catch (error) {
            next(error)
        }
    }
}