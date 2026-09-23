import { CreateContactInput, UpdateContactInput } from "../presentation/contact.schemas";
import { IContactWithOwner } from "./contact.datasource.contract";
import { ContactEntity } from "./contact.entity";

export interface IContactRepository {
    create(data: CreateContactInput, organizationId: string): Promise<ContactEntity>
    findById(contactId: string, organizationId: string): Promise<ContactEntity | null>
    findMany(organizationId: string): Promise<IContactWithOwner[]>
    deleteById(contactId: string, organizationId: string): Promise<void>
    update(data: UpdateContactInput, contactId: string, organizationId: string): Promise<ContactEntity>
}