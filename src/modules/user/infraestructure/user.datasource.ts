import { TRegisterUser } from "../../auth/presentation/auth.schemas";
import { IUserDatasource } from "../domain/user.datasource.contract";
import { UserEntity } from "../domain/user.entity";
import { CustomError } from "../../../shared/errors/custom-errors";
import { PrismaClient } from "../../../generated/prisma/client";



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
            throw CustomError.handlePrismaError(error)
        }
    }

}