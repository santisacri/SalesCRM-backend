import { TRegisterUser } from "../../auth/presentation/auth.schemas";
import { IUserDatasource } from "../domain/user.datasource.contract";
import { UserEntity } from "../domain/user.entity";
import { PrismaClient } from "../../../generated/prisma/client";
import handlePrismaError from "../../../shared/errors/prisma-errors";



export class UserDatasource implements IUserDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }



    async create(data: TRegisterUser): Promise<UserEntity> {
        try {
            const newUser = await this.prisma.user.create({
                data: data
            })

            return UserEntity.fromObject(newUser)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email }
            })

            if (!user) return null

            return UserEntity.fromObject(user)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async getById(id: string): Promise<UserEntity> {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: { id }
            })

            return UserEntity.fromObject(user)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async setPasswordResetToken(token: string, userId: string): Promise<void> {
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: { PasswordResetToken: token }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }

}