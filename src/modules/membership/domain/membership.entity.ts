import { CustomError } from "../../../shared/errors/custom-errors"

export enum MembershipStatusEnum {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED'
}

export enum MembershipRoleEnum {
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER'
}

interface IMembershipEntity {
    id: string
    status: MembershipStatusEnum
    role: MembershipRoleEnum
    organizationId: string
    userId: string
    teamId: string | null
    createdAt: Date
    updatedAt: Date
}

export class MembershipEntity {

    private constructor(
        public id: string,
        public status: MembershipStatusEnum,
        public role: MembershipRoleEnum,
        public organizationId: string,
        public userId: string,
        public teamId: string | null,
        public createdAt: Date,
        public updatedAt: Date
    ) { }


    static fromObject(props: IMembershipEntity): MembershipEntity {
        const { id, status, role, organizationId, userId, teamId, createdAt, updatedAt } = props

        if (!id) throw CustomError.badRequest('[MembershipEntity] Missing id');
        if (!status) throw CustomError.badRequest('[MembershipEntity] Missing status');
        if (!role) throw CustomError.badRequest('[MembershipEntity] Missing role');
        if (!organizationId) throw CustomError.badRequest('[MembershipEntity] Missing organizationId');
        if (!userId) throw CustomError.badRequest('[MembershipEntity] Missing userId');
        if (!createdAt) throw CustomError.badRequest('[MembershipEntity] Missing createdAt');
        if (!updatedAt) throw CustomError.badRequest('[MembershipEntity] Missing updatedAt');

        return new MembershipEntity(id, status, role, organizationId, userId, teamId, createdAt, updatedAt)
    }
}