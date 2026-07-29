import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { MembershipEntity, MembershipStatusEnum, MembershipRoleEnum } from "./membership.entity";

export type TCreateMembership = {
    userId: string,
    organizationId: string,
    role: MembershipRoleEnum,
    status: MembershipStatusEnum
}

export interface IMembershipDatasource {
    create(data: TCreateMembership, tx?: PrismaTransactionClient): Promise<MembershipEntity>
}