import { MembershipRoleEnum, MembershipStatusEnum } from "../../membership/domain/membership.entity";
import { IMembershipRepository } from "../../membership/domain/membership.repository.contract";
import { OrganizationEntity } from "../domain/organization.entity";
import { IOrganizationRepository } from "../domain/organization.repository.contract";

export interface IGetUserOrganizationsUseCase {
    execute(userId: string): Promise<{ organization: OrganizationEntity, role: MembershipRoleEnum }[]>
}

export class GetUserOrganizationsUseCase implements IGetUserOrganizationsUseCase {

    constructor(
        private readonly orgRepo: IOrganizationRepository,
        private readonly membershipRepo: IMembershipRepository
    ) { }

    async execute(userId: string): Promise<{ organization: OrganizationEntity, role: MembershipRoleEnum }[]> {
        const memberships = await this.membershipRepo.findManyByUserId(userId, MembershipStatusEnum.ACTIVE)

        if (memberships.length === 0) return []

        const organizationsIds = memberships.map(member => member.organizationId)

        const organizations = await this.orgRepo.findManyById(organizationsIds)

        return memberships.map((membership) => ({
            organization: organizations.find((org) => org.id === membership.organizationId)!,
            role: membership.role,
        }))
    }

}