import { MembershipRoleEnum } from "../../modules/membership/domain/membership.entity"

export type OrgScopedCtx = {
    userId: string,
    organizationId: string,
    role: MembershipRoleEnum,
    teamId: string | null,
}