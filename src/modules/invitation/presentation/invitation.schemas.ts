import z from "zod";
import { emailValidation } from "../../auth/presentation/auth.schemas";

export const inviteToOrganizationSchema = z.object({
    email: emailValidation
})

export type InviteToOrganizationInput = z.infer<typeof inviteToOrganizationSchema>