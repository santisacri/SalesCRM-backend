import z from "zod";
import { DealStageEnum } from "../domain/deal.entity";


export const createDealSchema = z.object({
    title: z.string().trim().min(3, 'Title too short').max(30, 'Title too long'),
    amount: z.number().positive(),
    stage: z.enum(DealStageEnum),
    contactId: z.string(),
    ownerId: z.string(),
    teamId: z.string(),
    expectedCloseDate: z.date().nullable()
})

export type CreateDealInput = z.infer<typeof createDealSchema>

export const updateDealSchema = z.object({
    title: z.string().trim().min(3).max(30).optional(),
    amount: z.number().nonnegative().optional(),
    expectedCloseDate: z.coerce.date().nullable().optional(),
    ownerId: z.uuid({ version: 'v7' }).optional(),
    contactId: z.uuid({ version: 'v7' }).optional(),
}).refine(
    (data) => Object.keys(data).length > 0,
    { error: 'At least one field must be provided', path: ['body'] }
)

export type UpdateDealInput = z.infer<typeof updateDealSchema>