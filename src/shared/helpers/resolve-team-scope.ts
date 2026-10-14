import { MembershipRoleEnum } from "../../generated/prisma/enums"
import { CustomError } from "../errors/custom-errors"
import { OrgScopedCtx } from "../types/context.types"

export function resolveTeamScope(requestedTeamId: string | undefined, ctx: OrgScopedCtx): string | null {
    if (ctx.role === MembershipRoleEnum.OWNER) return requestedTeamId ?? null

    if (!ctx.teamId) {
        throw CustomError.forbidden("You must be assigned to a team")
    }

    return ctx.teamId
}