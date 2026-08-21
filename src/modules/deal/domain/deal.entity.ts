import { CustomError } from "../../../shared/errors/custom-errors"
import { ErrorCode } from "../../../shared/errors/error-codes"

export enum DealStageEnum {
    QUALIFIED = 'QUALIFIED',
    PROPOSAL = 'PROPOSAL',
    NEGOTIATION = 'NEGOTIATION',
    WON = 'WON',
    LOST = 'LOST'
}

interface IDealEntity {
    id: string
    organizationId: string
    teamId: string
    contactId: string
    title: string
    amount: number
    stage: DealStageEnum
    ownerId: string
    expectedCloseDate: Date | null
    closedAt: Date | null
    createdAt: Date
    updatedAt: Date
}

export class DealEntity {

    private constructor(
        public id: string,
        public organizationId: string,
        public teamId: string,
        public contactId: string,
        public title: string,
        public amount: number,
        public stage: DealStageEnum,
        public ownerId: string,
        public expectedCloseDate: Date | null,
        public closedAt: Date | null,
        public createdAt: Date,
        public updatedAt: Date
    ) { }


    static fromObject(props: IDealEntity): DealEntity {
        const { id, organizationId, teamId, contactId, title, amount, stage, ownerId, expectedCloseDate, closedAt, createdAt, updatedAt } = props

        if (!id) throw CustomError.badRequest('[DealEntity] Missing id', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!organizationId) throw CustomError.badRequest('[DealEntity] Missing organizationId', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!teamId) throw CustomError.badRequest('[DealEntity] Missing teamId', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!contactId) throw CustomError.badRequest('[DealEntity] Missing contactId', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!title) throw CustomError.badRequest('[DealEntity] Missing title', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (amount === undefined || amount === null) throw CustomError.badRequest('[DealEntity] Missing amount', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!stage) throw CustomError.badRequest('[DealEntity] Missing stage', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!ownerId) throw CustomError.badRequest('[DealEntity] Missing ownerId', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!createdAt) throw CustomError.badRequest('[DealEntity] Missing createdAt', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);
        if (!updatedAt) throw CustomError.badRequest('[DealEntity] Missing updatedAt', ErrorCode.MISSING_REQUIRED_ENTITY_PROP);

        return new DealEntity(id, organizationId, teamId, contactId, title, amount, stage, ownerId, expectedCloseDate ?? null, closedAt ?? null, createdAt, updatedAt)
    }
}