import z from "zod";

export const createContactSchema = z.object({
    name: z.string().min(2).max(30).trim(),
    email: z.email().trim(),
    phone: z.string().max(20).trim(),
    company: z.string().min(2).max(30),
    ownerId: z.uuid({ version: 'v7' })
})

export type CreateContactInput = z.infer<typeof createContactSchema>