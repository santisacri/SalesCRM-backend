import { CustomError } from "../../../shared/errors/custom-errors"

export interface IUserEntity {
    id: string
    name: string
    email: string
    password: string
    emailVerified: boolean
    createdAt: Date
    updatedAt: Date
}

export class UserEntity {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly emailVerified: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    static fromObject(props: IUserEntity): UserEntity {
        const { createdAt, email, id, name, password, updatedAt, emailVerified } = props

        if (!id) throw CustomError.badRequest('id is missing')
        if (!name) throw CustomError.badRequest('name is missing')
        if (!password) throw CustomError.badRequest('password is missing')
        if (!email) throw CustomError.badRequest('email is missing')
        if (!emailVerified) throw CustomError.badRequest('emailVerified is missing')
        if (!createdAt) throw CustomError.badRequest('createdAt is missing')
        if (!updatedAt) throw CustomError.badRequest('updatedAt is missing')

        return new UserEntity(id, name, email, password, emailVerified, createdAt, updatedAt)
    }

    static toDto(user: UserEntity) {
        const { password, ...rest } = user
        return rest
    }
}