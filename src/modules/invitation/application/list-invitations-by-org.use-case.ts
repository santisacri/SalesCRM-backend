import { InvitationWithInviter } from "../domain/invitation.datasource.contract";
import { IInvitationRepository } from "../domain/invitation.repository.contract";

export interface IListInvitationsByOrgUseCase {
    execute(organizationId: string): Promise<InvitationWithInviter[]>
}

export class ListInvitationsByOrgUseCase implements IListInvitationsByOrgUseCase {

    constructor(
        private readonly invitationRepo: IInvitationRepository
    ) { }

    async execute(organizationId: string): Promise<InvitationWithInviter[]> {
        return this.invitationRepo.listByOrg(organizationId)
    }

}