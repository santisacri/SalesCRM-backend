import { InvitationEntity } from "../domain/invitation.entity";
import { IInvitationRepository } from "../domain/invitation.repository.contract";

export interface IListInvitationsByUserUseCase {
    execute(email: string): Promise<InvitationEntity[]>
}

export class ListInvitationsByUser implements IListInvitationsByUserUseCase {

    constructor(
        private readonly invitationRepo: IInvitationRepository
    ) { }

    async execute(email: string): Promise<InvitationEntity[]> {
        return this.invitationRepo.findByEmail(email)
    }

}