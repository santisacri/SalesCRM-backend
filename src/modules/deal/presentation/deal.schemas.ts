import z from "zod";
import { DealStageEnum } from "../domain/deal.entity";


export const createDealSchema = z.object({
    title: z.string().min(3, 'Title too short').max(30, 'Title too long'),
    amount: z.number().positive(),
    stage: z.enum(DealStageEnum),
    contactId: z.string(),
    ownerId: z.string(),
    teamId: z.string(),
    expectedCloseDate: z.date().nullable()
})

export type CreateDealInput = z.infer<typeof createDealSchema>