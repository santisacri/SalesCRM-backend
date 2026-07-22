import { TRegisterUser } from "../../auth/presentation/auth.schemas";
import { IUserDatasource } from "../domain/user.datasource.contract";
import { UserEntity } from "../domain/user.entity";
import { IUserRepository } from "../domain/user.repository.contract";


export class UserRepository implements IUserRepository {

    constructor(
        private readonly userDatasource: IUserDatasource
    ) { }

    async save(user: UserEntity): Promise<void> {
        return this.userDatasource.save(user)
    }

    async getById(id: string): Promise<UserEntity> {
        return this.userDatasource.getById(id)
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userDatasource.findByEmail(email)
    }

    async create(data: TRegisterUser): Promise<UserEntity> {
        return this.userDatasource.create(data)
    }

}