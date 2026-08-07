import { CustomError } from "../../../shared/errors/custom-errors"
import { ErrorCode } from "../../../shared/errors/error-codes"

export enum ContactSource {
    MANUAL = 'MANUAL',
    WEBSITE = 'WEBSITE',
    REFERRAL = 'REFERRAL',
    OTHER = 'OTHER'
}

export interface IContactEntity {
    id: string,
    organizationId: string,
    name: string,
    email: string | null,
    phone: string | null,
    company: string | null,
    source: ContactSource,
    ownerId: string,
    createdAt: Date,
    updatedAt: Date,
}

export class ContactEntity {

    private constructor(
        public id: string,
        public organizationId: string,
        public name: string,
        public email: string | null,
        public phone: string | null,
        public company: string | null,
        public source: ContactSource,
        public ownerId: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }

    static fromObject(props: IContactEntity): ContactEntity {
        const { id, organizationId, name, email, phone, company, source, ownerId, createdAt, updatedAt } = props

        if (!id) throw CustomError.badRequest('Missing id', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!organizationId) throw CustomError.badRequest('Missing organizationId', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!name) throw CustomError.badRequest('Missing name', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!source) throw CustomError.badRequest('Missing source', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!ownerId) throw CustomError.badRequest('Missing ownerId', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!createdAt) throw CustomError.badRequest('Missing createdAt', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!updatedAt) throw CustomError.badRequest('Missing updatedAt', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);

        return new ContactEntity(id, organizationId, name, email, phone, company, source, ownerId, createdAt, updatedAt)
    }
}