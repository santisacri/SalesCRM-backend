import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { TCreateMembership } from "./membership.datasource.contract";
import { MembershipEntity, MembershipStatusEnum } from "./membership.entity";

export interface IMembershipRepository {
    create(data: TCreateMembership, tx?: PrismaTransactionClient): Promise<MembershipEntity>
    findManyByUserId(userId: string, status: MembershipStatusEnum): Promise<MembershipEntity[]>
    findActive(userId: string, organizationId: string): Promise<MembershipEntity | null>
}