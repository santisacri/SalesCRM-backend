import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { IMembershipDatasource, MembershipWithUser } from "../domain/membership.datasource.contract";
import { MembershipEntity, MembershipStatusEnum } from "../domain/membership.entity";
import { IMembershipRepository } from "../domain/membership.repository.contract";
import { CreateMembershipInput } from "../presentation/membership.schemas";


export class MembershipRepository implements IMembershipRepository {

    constructor(
        private readonly membershipDatasource: IMembershipDatasource
    ) { }

    update(membership: MembershipEntity): Promise<MembershipEntity> {
        return this.membershipDatasource.update(membership)

    }

    findManyByOrg(organizationId: string, status: MembershipStatusEnum): Promise<MembershipWithUser[]> {
        return this.membershipDatasource.findManyByOrg(organizationId, status)
    }

    findActive(userId: string, organizationId: string): Promise<MembershipEntity | null> {
        return this.membershipDatasource.findActive(userId, organizationId)
    }

    findManyByUserId(userId: string, status: MembershipStatusEnum): Promise<MembershipEntity[]> {
        return this.membershipDatasource.findManyByUserId(userId, status)
    }

    create(data: CreateMembershipInput, organizationId: string, tx?: PrismaTransactionClient): Promise<MembershipEntity> {
        return this.membershipDatasource.create(data, organizationId, tx)
    }

}