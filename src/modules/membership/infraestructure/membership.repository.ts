import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { IMembershipDatasource, TCreateMembership } from "../domain/membership.datasource.contract";
import { MembershipEntity } from "../domain/membership.entity";
import { IMembershipRepository } from "../domain/membership.repository.contract";


export class MembershipRepository implements IMembershipRepository {

    constructor(
        private readonly membershipDatasource: IMembershipDatasource
    ) { }

    create(data: TCreateMembership, tx?: PrismaTransactionClient): Promise<MembershipEntity> {
        return this.membershipDatasource.create(data, tx)
    }

}