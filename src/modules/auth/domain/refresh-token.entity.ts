import { CustomError } from "../../../shared/errors/custom-errors"

interface IRefreshTokenEntity {
    id: string
    token: string
    family: string
    expiresAt: Date
    createdAt: Date
    revoked: boolean
    userId: string
}

export class RefreshTokenEntity {
    private constructor(
        public readonly id: string,
        public readonly token: string,
        public readonly family: string,
        public readonly expiresAt: Date,
        public readonly createdAt: Date,
        public readonly revoked: boolean,
        public readonly userId: string,
    ) { }

    static fromObject(props: IRefreshTokenEntity): RefreshTokenEntity {
        const { id, token, family, expiresAt, createdAt, revoked, userId } = props

        if (!id) throw CustomError.badRequest('id is missing')
        if (!token) throw CustomError.badRequest('token is missing')
        if (!family) throw CustomError.badRequest('family is missing')
        if (!expiresAt) throw CustomError.badRequest('expiresAt is missing')
        if (!createdAt) throw CustomError.badRequest('createdAt is missing')
        if (revoked === undefined || revoked === null) throw CustomError.badRequest('revoked is missing')
        if (!userId) throw CustomError.badRequest('userId is missing')

        return new RefreshTokenEntity(id, token, family, expiresAt, createdAt, revoked, userId)
    }
}