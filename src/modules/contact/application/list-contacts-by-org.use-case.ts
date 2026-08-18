import { ContactEntity } from "../domain/contact.entity";
import { IContactRepository } from "../domain/contact.repository.contract";

export interface IListContactsByOrgUseCase {
    execute(organizationId: string): Promise<ContactEntity[]>
}

export class ListContactsByOrgUseCase implements IListContactsByOrgUseCase {

    constructor(
        private readonly contactRepo: IContactRepository
    ) { }

    async execute(organizationId: string): Promise<ContactEntity[]> {
        return this.contactRepo.findMany(organizationId)
    }

}