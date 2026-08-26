import { CustomError } from "../../../shared/errors/custom-errors"
import { MembershipRoleEnum } from "../../membership/domain/membership.entity"

export enum InvitationStatusEnum {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    EXPIRED = 'EXPIRED',
    REVOKED = 'REVOKED'
}

interface IInvitationEntity {
    id: string
    organizationId: string
    invitedById: string | null
    email: string
    token: string
    role: MembershipRoleEnum
    status: InvitationStatusEnum
    expiresAt: Date
    createdAt: Date
}

export class InvitationEntity {

    private constructor(
        public id: string,
        public organizationId: string,
        public invitedById: string | null,
        public email: string,
        public token: string,
        public role: MembershipRoleEnum,
        public status: InvitationStatusEnum,
        public expiresAt: Date,
        public createdAt: Date
    ) { }


    static fromObject(props: IInvitationEntity): InvitationEntity {
        const { id, organizationId, invitedById, email, token, role, status, expiresAt, createdAt } = props

        if (!id) throw CustomError.badRequest('[InvitationEntity] Missing id');
        if (!organizationId) throw CustomError.badRequest('[InvitationEntity] Missing organizationId');
        if (!email) throw CustomError.badRequest('[InvitationEntity] Missing email');
        if (!token) throw CustomError.badRequest('[InvitationEntity] Missing token');
        if (!role) throw CustomError.badRequest('[InvitationEntity] Missing role');
        if (!status) throw CustomError.badRequest('[InvitationEntity] Missing status');
        if (!expiresAt) throw CustomError.badRequest('[InvitationEntity] Missing expiresAt');
        if (!createdAt) throw CustomError.badRequest('[InvitationEntity] Missing createdAt');

        return new InvitationEntity(id, organizationId, invitedById, email, token, role, status, expiresAt, createdAt)
    }
}