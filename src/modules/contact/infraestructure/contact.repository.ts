import { IContactDatasource } from "../domain/contact.datasource.contract";
import { ContactEntity } from "../domain/contact.entity";
import { IContactRepository } from "../domain/contact.repository.contract";
import { CreateContactInput, UpdateContactInput } from "../presentation/contact.schemas";


export class ContactRepository implements IContactRepository {

    constructor(
        private readonly contactDatasource: IContactDatasource
    ) { }
    update(data: UpdateContactInput, contactId: string, organizationId: string): Promise<ContactEntity> {
        return this.contactDatasource.update(data, contactId, organizationId)
    }

    deleteById(contactId: string, organizationId: string): Promise<void> {
        return this.contactDatasource.deleteById(contactId, organizationId)
    }

    findById(contactId: string, organizationId: string): Promise<ContactEntity | null> {
        return this.contactDatasource.findById(contactId, organizationId)
    }

    create(data: CreateContactInput, organizationId: string): Promise<ContactEntity> {
        return this.contactDatasource.create(data, organizationId)
    }

}