import { IContactDatasource } from "../domain/contact.datasource.contract";
import { ContactEntity } from "../domain/contact.entity";
import { IContactRepository } from "../domain/contact.repository.contract";
import { CreateContactInput } from "../presentation/contact.schemas";


export class ContactRepository implements IContactRepository {

    constructor(
        private readonly contactDatasource: IContactDatasource
    ) { }

    findById(contactId: string, organizationId: string): Promise<ContactEntity | null> {
        return this.contactDatasource.findById(contactId, organizationId)
    }

    create(data: CreateContactInput, organizationId: string): Promise<ContactEntity> {
        return this.contactDatasource.create(data, organizationId)
    }

}