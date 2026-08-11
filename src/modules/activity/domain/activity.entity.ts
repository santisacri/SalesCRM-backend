import { CustomError } from "../../../shared/errors/custom-errors"

export enum ActivityTypeEnum {
    NOTE = 'NOTE',
    STAGE_CHANGE = 'STAGE_CHANGE',
    CALL_LOGGED = 'CALL_LOGGED',
    EMAIL_LOGGED = 'EMAIL_LOGGED'
}

interface IActivityEntity {
    id: string
    organizationId: string
    contactId: string
    dealId: string | null
    type: ActivityTypeEnum
    content: Record<string, unknown>
    createdById: string
    createdAt: Date
}

export class ActivityEntity {

    private constructor(
        public id: string,
        public organizationId: string,
        public contactId: string,
        public dealId: string | null,
        public type: ActivityTypeEnum,
        public content: Record<string, unknown>,
        public createdById: string,
        public createdAt: Date
    ) { }


    static fromObject(props: IActivityEntity): ActivityEntity {
        const { id, organizationId, contactId, dealId, type, content, createdById, createdAt } = props

        if (!id) throw CustomError.badRequest('[ActivityEntity] Missing id');
        if (!organizationId) throw CustomError.badRequest('[ActivityEntity] Missing organizationId');
        if (!contactId) throw CustomError.badRequest('[ActivityEntity] Missing contactId');
        if (!type) throw CustomError.badRequest('[ActivityEntity] Missing type');
        if (!content) throw CustomError.badRequest('[ActivityEntity] Missing content');
        if (!createdById) throw CustomError.badRequest('[ActivityEntity] Missing createdById');
        if (!createdAt) throw CustomError.badRequest('[ActivityEntity] Missing createdAt');

        return new ActivityEntity(id, organizationId, contactId, dealId ?? null, type, content, createdById, createdAt)
    }
}