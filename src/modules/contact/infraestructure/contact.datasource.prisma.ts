import { Contact, PrismaClient } from "../../../generated/prisma/client";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { IContactDatasource } from "../domain/contact.datasource.contract";
import { ContactEntity, ContactSourceEnum } from "../domain/contact.entity";
import { CreateContactInput, UpdateContactInput } from "../presentation/contact.schemas";

export class ContactDatasource implements IContactDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    private toEntity(props: Contact): ContactEntity {
        return ContactEntity.fromObject({
            ...props,
            source: props.source as ContactSourceEnum
        })
    }

    async create(data: CreateContactInput, organizationId: string): Promise<ContactEntity> {
        try {
            const newContact = await this.prisma.contact.create({
                data: {
                    ...data,
                    organizationId,
                }
            })

            return this.toEntity(newContact)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async findById(contactId: string, organizationId: string): Promise<ContactEntity | null> {
        try {
            const record = await this.prisma.contact.findUnique({
                where: { id: contactId, organizationId, deletedAt: null }
            })

            if (!record) return null;

            return this.toEntity(record)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async deleteById(contactId: string, organizationId: string): Promise<void> {
        try {
            await this.prisma.contact.update({
                where: { id: contactId, organizationId },
                data: { deletedAt: new Date(Date.now()) }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async update(data: UpdateContactInput, contactId: string, organizationId: string): Promise<ContactEntity> {
        try {
            const updatedContact = await this.prisma.contact.update({
                where: { id: contactId, organizationId },
                data
            })

            return this.toEntity(updatedContact)
        } catch (error) {
            console.log(error)
            handlePrismaError(error)
        }
    }

}   