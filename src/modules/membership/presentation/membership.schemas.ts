import z from "zod";
import { MembershipRoleEnum } from "../domain/membership.entity";


export const createMembershipSchema = z.object({
    userId: z.uuidv7(),
    role: z.enum(MembershipRoleEnum)
})

export type CreateMembershipInput = z.infer<typeof createMembershipSchema>