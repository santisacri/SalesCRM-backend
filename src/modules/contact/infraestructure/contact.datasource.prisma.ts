import { Contact, PrismaClient } from "../../../generated/prisma/client";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { IContactDatasource } from "../domain/contact.datasource.contract";
import { ContactEntity, ContactSource } from "../domain/contact.entity";
import { CreateContactInput } from "../presentation/contact.schemas";

export class ContactDatasource implements IContactDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    private toEntity(props: Contact): ContactEntity {
        return ContactEntity.fromObject({
            ...props,
            source: props.source as ContactSource
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

}