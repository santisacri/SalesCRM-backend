import { RegisterUserInput } from "../../auth/presentation/auth.schemas";
import { UserEntity } from "./user.entity";

export interface IUserDatasource {
    create(data: RegisterUserInput): Promise<UserEntity>
    findByEmail(email: string): Promise<UserEntity | null>
    getById(id: string): Promise<UserEntity>
    save(user: UserEntity): Promise<void>
}