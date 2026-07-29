import { ITransactionManager } from "../../../shared/database/transaction-manager";
import { MembershipRoleEnum, MembershipStatusEnum } from "../../membership/domain/membership.entity";
import { IMembershipRepository } from "../../membership/domain/membership.repository.contract";
import { OrganizationEntity } from "../domain/organization.entity";
import { IOrganizationRepository } from "../domain/organization.repository.contract";

export interface ICreateOrganizationUseCase {
    execute(name: string, userId: string): Promise<OrganizationEntity>
}

export class CreateOrganizationUseCase implements ICreateOrganizationUseCase {

    constructor(
        private readonly orgRepo: IOrganizationRepository,
        private readonly membershipRepo: IMembershipRepository,
        private readonly tx: ITransactionManager
    ) { }

    async execute(name: string, userId: string): Promise<OrganizationEntity> {
        return this.tx.run(async (tx) => {
            const organization = await this.orgRepo.createOrg(name, tx)

            await this.membershipRepo.create({
                userId,
                organizationId: organization.id,
                role: MembershipRoleEnum.OWNER,
                status: MembershipStatusEnum.ACTIVE
            }, tx)

            return organization
        })
    }

}
