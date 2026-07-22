import { CustomError } from "../../../shared/errors/custom-errors"

export enum TokenType {
    EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
    PASSWORD_RESET = 'PASSWORD_RESET',
}

export interface ITokenEntity {
    id: string,
    userId: string,
    type: TokenType,
    tokenHash: string,
    usedAt: Date | null,
    createdAt: Date,
    expiresAt: Date,
}

export class TokenEntity {

    private constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly type: TokenType,
        public readonly tokenHash: string,
        public readonly usedAt: Date | null,
        public readonly createdAt: Date,
        public readonly expiresAt: Date,
    ) { }


    static fromObject(props: ITokenEntity): TokenEntity {
        const { id, userId, type, tokenHash, usedAt, createdAt, expiresAt } = props

        if (!id) throw CustomError.badRequest('Missing Id');
        if (!userId) throw CustomError.badRequest('Missing userId');
        if (!type) throw CustomError.badRequest('Missing type');
        if (!tokenHash) throw CustomError.badRequest('Missing tokenHash');
        if (usedAt === undefined) throw CustomError.badRequest('Missing usedAt');
        if (!createdAt) throw CustomError.badRequest('Missing createdAt');
        if (!expiresAt) throw CustomError.badRequest('Missing ExpiresAt');

        return new TokenEntity(id, userId, type, tokenHash, usedAt, createdAt, expiresAt)
    }
}
