import { CustomError } from "../../../shared/errors/custom-errors";
import { IHashService } from "../../../shared/services/hash.service";
import { TokenUtil } from "../../../shared/utils/token.util";
import { UserEntity } from "../../user/domain/user.entity";
import { IUserRepository } from "../../user/domain/user.repository.contract";

export interface IResetPasswordUseCase {
    execute(newPassword: string, rawToken: string): Promise<void>
}

export class ResetPasswordUseCase implements IResetPasswordUseCase {

    constructor(
        private readonly userRepo: IUserRepository,
        private readonly hashService: IHashService
    ) { }

    async execute(newPassword: string, rawToken: string): Promise<void> {

        const hashed = TokenUtil.hash(rawToken)

        const user = await this.userRepo.findByPasswordResetToken(hashed)
        if (!user) throw CustomError.badRequest('Invalid or expired token');
        if (user.passwordResetExpires! < new Date()) throw CustomError.badRequest('Invalid or expired token');

        const hashedPassword = this.hashService.hash(newPassword)

        const updatedUser = UserEntity.fromObject({
            ...user,
            password: hashedPassword,
            passwordResetExpires: null,
            passwordResetToken: null
        })

        await this.userRepo.save(updatedUser)
    }

}
