import { CustomError } from "../../../shared/errors/custom-errors"

export interface IUserEntity {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    passwordResetToken: string | null
    passwordResetExpires: Date | null
}

export class UserEntity {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly passwordResetToken: string | null,
        public readonly passwordResetExpires: Date | null,
    ) { }

    static fromObject(props: IUserEntity): UserEntity {
        const { createdAt, email, id, name, password, updatedAt, passwordResetExpires, passwordResetToken } = props

        if (!id) throw CustomError.badRequest('id is missing')
        if (!name) throw CustomError.badRequest('name is missing')
        if (!password) throw CustomError.badRequest('password is missing')
        if (!email) throw CustomError.badRequest('email is missing')
        if (!createdAt) throw CustomError.badRequest('createdAt is missing')
        if (!updatedAt) throw CustomError.badRequest('updatedAt is missing')

        return new UserEntity(id, name, email, password, createdAt, updatedAt, passwordResetToken, passwordResetExpires)
    }

    static toDto(user: UserEntity) {
        const { password, ...rest } = user
        return rest
    }
}