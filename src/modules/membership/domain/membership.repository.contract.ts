import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { CreateMembershipInput } from "../presentation/membership.schemas";
import { MembershipWithUser } from "./membership.datasource.contract";
import { MembershipEntity, MembershipStatusEnum } from "./membership.entity";

export interface IMembershipRepository {
    create(data: CreateMembershipInput, organizationId: string, tx?: PrismaTransactionClient): Promise<MembershipEntity>
    findManyByUserId(userId: string, status: MembershipStatusEnum): Promise<MembershipEntity[]>
    findManyByOrg(organizationId: string, status: MembershipStatusEnum): Promise<MembershipWithUser[]>
    findActive(userId: string, organizationId: string): Promise<MembershipEntity | null>
    update(membership: MembershipEntity): Promise<MembershipEntity>
}