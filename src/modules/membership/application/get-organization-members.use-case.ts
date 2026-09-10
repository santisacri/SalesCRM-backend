import { MembershipWithUser } from "../domain/membership.datasource.contract";
import { MembershipStatusEnum } from "../domain/membership.entity";
import { IMembershipRepository } from "../domain/membership.repository.contract";

export interface IGetOrganizationMembersUseCase {
    execute(organizationId: string, status: string): Promise<MembershipWithUser[]>
}

export class GetOrganizationMembersUseCase implements IGetOrganizationMembersUseCase {

    constructor(
        private readonly membershipRepo: IMembershipRepository
    ) { }

    async execute(organizationId: string, status: string): Promise<MembershipWithUser[]> {
        return this.membershipRepo.findManyByOrg(organizationId, status as MembershipStatusEnum)
    }

}