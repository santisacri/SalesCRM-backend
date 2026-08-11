import { CreateContactInput } from "../presentation/contact.schemas";
import { ContactEntity } from "./contact.entity";

export interface IContactRepository {
    create(data: CreateContactInput, organizationId: string): Promise<ContactEntity>
    findById(contactId: string, organizationId: string): Promise<ContactEntity | null>
}