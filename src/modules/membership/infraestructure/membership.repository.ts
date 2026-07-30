import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { IMembershipDatasource, TCreateMembership } from "../domain/membership.datasource.contract";
import { MembershipEntity, MembershipStatusEnum } from "../domain/membership.entity";
import { IMembershipRepository } from "../domain/membership.repository.contract";


export class MembershipRepository implements IMembershipRepository {

    constructor(
        private readonly membershipDatasource: IMembershipDatasource
    ) { }

    findActive(userId: string, organizationId: string): Promise<MembershipEntity | null> {
        return this.membershipDatasource.findActive(userId, organizationId)
    }

    findManyByUserId(userId: string, status: MembershipStatusEnum): Promise<MembershipEntity[]> {
        return this.membershipDatasource.findManyByUserId(userId, status)
    }

    create(data: TCreateMembership, tx?: PrismaTransactionClient): Promise<MembershipEntity> {
        return this.membershipDatasource.create(data, tx)
    }

}