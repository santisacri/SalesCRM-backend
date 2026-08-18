import { MembershipRoleEnum } from "../../modules/membership/domain/membership.entity"

export type Ctx = {
    userId: string,
    organizationId: string,
    role: MembershipRoleEnum
}