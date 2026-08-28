import z from "zod";
import { emailValidation, nameValidation, passwordValidation } from "../../auth/presentation/auth.schemas";

export const inviteToOrganizationSchema = z.object({
    email: emailValidation
})

export type InviteToOrganizationInput = z.infer<typeof inviteToOrganizationSchema>

export const registerDataSchema = z.object({
    password: passwordValidation,
    name: nameValidation
}).optional()

export type RegisterDataInput = z.infer<typeof registerDataSchema>