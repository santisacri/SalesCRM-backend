import { TRegisterUser } from "../../auth/presentation/auth.schemas";
import { UserEntity } from "./user.entity";

export interface IUserDatasource {
    create(data: TRegisterUser): Promise<UserEntity>
    findByEmail(email: string): Promise<UserEntity | null>
    findByPasswordResetToken(token: string): Promise<UserEntity | null>
    getById(id: string): Promise<UserEntity>
    setPasswordResetToken(token: string, userId: string): Promise<void>
    save(user: UserEntity): Promise<void>
}