import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { TCreateMembership } from "./membership.datasource.contract";
import { MembershipEntity } from "./membership.entity";

export interface IMembershipRepository {
    create(data: TCreateMembership, tx?: PrismaTransactionClient): Promise<MembershipEntity>
}