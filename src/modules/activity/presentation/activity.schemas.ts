import z from "zod";


export const createNoteSchema = z.object({
    text: z.string().min(5, 'At least 5 characters').max(200, 'Too long'),
    contactId: z.uuidv7('Invalid contact'),
    dealId: z.uuidv7('Invalid deal').nullable()
})

export type CreateNoteInput = z.infer<typeof createNoteSchema>