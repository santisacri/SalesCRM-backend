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

export const registerUserSchema = z.object({
    name: nameValidation,
    password: passwordValidation,
    email: z.email(),
})

export type TRegisterUser = z.infer<typeof registerUserSchema>

export const loginUserSchema = z.object({
    email: z.email(),
    password: passwordValidation
})

export type TLoginUser = z.infer<typeof loginUserSchema>

export const forgotPasswordSchema = z.object({
    email: z.email()
})

export type TForgotPassword = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z.object({
    newPassword: passwordValidation,
    token: z.string()
})

export type TResetPassword = z.infer<typeof resetPasswordSchema>

export const logoutQuerySchema = z.enum(['true', 'false']).transform(v => v === 'true')

export const verifyEmailSchema = z.object({
    token: z.string()
})
