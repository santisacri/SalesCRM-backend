import { IContactWithOwner } from "../domain/contact.datasource.contract";
import { IContactRepository } from "../domain/contact.repository.contract";

export interface IListContactsByOrgUseCase {
    execute(organizationId: string): Promise<IContactWithOwner[]>
}

export class ListContactsByOrgUseCase implements IListContactsByOrgUseCase {

    constructor(
        private readonly contactRepo: IContactRepository
    ) { }

    async execute(organizationId: string): Promise<IContactWithOwner[]> {
        return this.contactRepo.findMany(organizationId)
    }

}