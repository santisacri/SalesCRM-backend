import z from "zod";
import { ContactSourceEnum } from "../domain/contact.entity";
import { DealStageEnum } from "../../deal/domain/deal.entity";
import { ActivityTypeEnum } from "../../activity/domain/activity.entity";

export const createContactSchema = z.object({
    name: z.string().min(2).max(30).trim(),
    email: z.email().trim(),
    phone: z.string().max(20).trim(),
    company: z.string().min(2).max(30),
    ownerId: z.uuid({ version: 'v7' })
})

export type CreateContactInput = z.infer<typeof createContactSchema>

export const ContactDetailSchema = z.object({
    contact: z.object({
        id: z.string(),
        organizationId: z.string(),
        name: z.string(),
        email: z.string().nullable(),
        phone: z.string().nullable(),
        company: z.string().nullable(),
        source: z.enum(ContactSourceEnum),
        ownerId: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
    }),
    deals: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            amount: z.number(),
            stage: z.enum(DealStageEnum)
        })
    ),
    activities: z.array(
        z.object({
            id: z.string(),
            type: z.enum(ActivityTypeEnum),
            content: z.unknown(),
            createdAt: z.date()
        })
    )
})

export type ContactDetailOutput = z.infer<typeof ContactDetailSchema>