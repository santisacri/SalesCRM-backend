import z from "zod";

const orgNameValidation = z.string().min(3).max(50).trim()

export const createOrgSchema = z.object({
    name: orgNameValidation
})

export type CreateOrgInput = z.infer<typeof createOrgSchema>