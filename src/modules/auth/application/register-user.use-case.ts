import { IHashService } from "../../../shared/services/hash.service";
import { IUserDatasource } from "../../user/domain/user.datasource.contract";
import { TRegisterUser } from "../presentation/auth.schemas";

export interface IRegisterUserUseCase {
    execute(data: TRegisterUser): Promise<void>
}

export class RegisterUserUseCase implements IRegisterUserUseCase {

    constructor(
        private readonly userRepo: IUserDatasource,
        private readonly hashService: IHashService
    ) { }

    async execute(data: TRegisterUser): Promise<void> {
        const { password, ...rest } = data

        const passwordHash = this.hashService.hash(password)
        
        await this.userRepo.create({ password: passwordHash, ...rest })
    }

}