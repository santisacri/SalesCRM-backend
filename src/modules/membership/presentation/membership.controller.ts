import { NextFunction, Request, Response } from "express"
import { IGetOrganizationMembersUseCase } from "../application/get-organization-members.use-case"
import getContext from "../../../shared/helpers/get-context"
import { StatusQueryParamSchema } from "./membership.schemas"
import { IKickMemberUseCase } from "../application/kick-member.use-case"
import { IAssignMemberToTeamUseCase } from "../application/assign-member-to-team.use-case"

type UseCases = {
    getOrganizationMembers: IGetOrganizationMembersUseCase,
    kickMember: IKickMemberUseCase
    assignMemberToTeam: IAssignMemberToTeamUseCase
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

    kickMember = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const memberId = req.params.memberId as string
            const context = getContext(req)

            const suspendedMembership = await this.useCases.kickMember.execute(memberId, context)

            res.json({ suspendedMembership })
        } catch (error) {
            next(error)
        }
    }

    assignMemberToTeam = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const membershipId = req.params.membershipId as string
            const teamId = req.params.teamId as string
            const ctx = getContext(req)

            const membership = await this.useCases.assignMemberToTeam.execute(membershipId, teamId, ctx)

            res.json({ membership })
        } catch (error) {
            next(error)
        }
    }
}