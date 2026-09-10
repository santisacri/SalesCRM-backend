import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { CreateMembershipInput } from "../presentation/membership.schemas";
import { MembershipEntity, MembershipStatusEnum } from "./membership.entity";

export interface MembershipWithUser {
    membership: MembershipEntity,
    user: {
        name: string,
        email: string
    }
}


export interface IMembershipDatasource {
    create(data: CreateMembershipInput, organizationId: string, tx?: PrismaTransactionClient): Promise<MembershipEntity>
    findManyByUserId(userId: string, status: MembershipStatusEnum): Promise<MembershipEntity[]>
    findManyByOrg(organizationId: string, status: MembershipStatusEnum): Promise<MembershipWithUser[]>
    findActive(userId: string, organizationId: string): Promise<MembershipEntity | null>
    update(membership: MembershipEntity): Promise<MembershipEntity>
}