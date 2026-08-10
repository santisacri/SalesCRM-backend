import z from "zod";

const passwordValidation = z
    .string()
    .min(8, { error: 'Password must be at least 8 characters long' })
    .max(24, { error: 'Password must be at most 24 characters long' })
    .regex(/[0-9]/, { error: 'Password must contain at least one number' })
    .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
    .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' });

const nameValidation = z
    .string()
    .trim()
    .min(2, { error: 'At least 2 characters long' })
    .max(50, { error: 'Max 50 characters long' })
    .regex(/^[\p{L}\s'-]+$/u, { error: 'Name cannot contain special characters' });
const emailValidation = z.email({ error: 'invalid email' }).trim().toLowerCase()

export const registerUserSchema = z.object({
    name: nameValidation,
    password: passwordValidation,
    email: emailValidation
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>

export const loginUserSchema = z.object({
    email: emailValidation,
    password: passwordValidation
})

export type LoginUserInput = z.infer<typeof loginUserSchema>

export const forgotPasswordSchema = z.object({
    email: emailValidation
})

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z.object({
    newPassword: passwordValidation,
    token: z.string()
})

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

export const logoutQuerySchema = z.enum(['true', 'false']).transform(v => v === 'true')

export const verifyEmailSchema = z.object({
    token: z.string()
})

export const selectOrgSchema = z.object({
    organizationId: z.string()
})
