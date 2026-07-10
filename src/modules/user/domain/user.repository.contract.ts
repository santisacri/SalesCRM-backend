import { TRegisterUser } from "../../auth/presentation/auth.schemas";
import { UserEntity } from "./user.entity";

export interface IUserRepository {
    create(data: TRegisterUser): Promise<UserEntity>
}