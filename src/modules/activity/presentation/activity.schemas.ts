import z from "zod";


export const createNoteSchema = z.object({
    text: z.string().min(5, 'At least 5 characters').max(200, 'Too long'),
    contactId: z.uuidv7('Invalid contact'),
    dealId: z.uuidv7('Invalid deal').nullable()
})

export type CreateNoteInput = z.infer<typeof createNoteSchema>

export const listActivitiesQuerySchema = z.object({
    cursor: z.uuidv7().optional(),
    limit: z.coerce.number().int().min(1).max(50).default(20),
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
}).refine(
    (q) => !q.from || !q.to || q.from <= q.to,
    { error: '"from" must be before "to"', path: ['from'] }
)

export type ListActivitiesQuery = z.infer<typeof listActivitiesQuerySchema>