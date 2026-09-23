import { CreateContactInput, UpdateContactInput } from "../presentation/contact.schemas";
import { ContactEntity, IContactEntity } from "./contact.entity";

export interface IContactWithOwner {
    contact: IContactEntity,
    owner: {
        name: string,
        email: string
    }
}

export interface IContactDatasource {
    create(data: CreateContactInput, organizationId: string): Promise<ContactEntity>
    findById(contactId: string, organizationId: string): Promise<ContactEntity | null>
    findMany(organizationId: string): Promise<IContactWithOwner[]>
    deleteById(contactId: string, organizationId: string): Promise<void>
    update(data: UpdateContactInput, contactId: string, organizationId: string): Promise<ContactEntity>
}