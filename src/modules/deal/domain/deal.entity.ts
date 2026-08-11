import { CustomError } from "../../../shared/errors/custom-errors"

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
        const { id, organizationId, contactId, title, amount, stage, ownerId, expectedCloseDate, closedAt, createdAt, updatedAt } = props

        if (!id) throw CustomError.badRequest('[DealEntity] Missing id');
        if (!organizationId) throw CustomError.badRequest('[DealEntity] Missing organizationId');
        if (!contactId) throw CustomError.badRequest('[DealEntity] Missing contactId');
        if (!title) throw CustomError.badRequest('[DealEntity] Missing title');
        if (amount === undefined || amount === null) throw CustomError.badRequest('[DealEntity] Missing amount');
        if (!stage) throw CustomError.badRequest('[DealEntity] Missing stage');
        if (!ownerId) throw CustomError.badRequest('[DealEntity] Missing ownerId');
        if (!createdAt) throw CustomError.badRequest('[DealEntity] Missing createdAt');
        if (!updatedAt) throw CustomError.badRequest('[DealEntity] Missing updatedAt');

        return new DealEntity(id, organizationId, contactId, title, amount, stage, ownerId, expectedCloseDate ?? null, closedAt ?? null, createdAt, updatedAt)
    }
}