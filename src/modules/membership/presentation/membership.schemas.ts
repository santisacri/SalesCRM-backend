import z from "zod";
import { MembershipRoleEnum } from "../domain/membership.entity";
import { MembershipStatusEnum } from "../../../generated/prisma/enums";


export const createMembershipSchema = z.object({
    userId: z.uuidv7(),
    role: z.enum(MembershipRoleEnum)
})

export type CreateMembershipInput = z.infer<typeof createMembershipSchema>

export const StatusQueryParamSchema = z.enum(MembershipStatusEnum, 'invalid status')

export const changeAdminSchema = z.object({
    newAdminMembershipId: z.uuidv7(),
    currentAdminMembershipId: z.uuidv7(),
    teamId: z.uuidv7()
})

export type ChangeAdminInput = z.infer<typeof changeAdminSchema>
