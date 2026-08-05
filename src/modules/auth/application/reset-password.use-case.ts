import { CustomError } from "../../../shared/errors/custom-errors";
import { ErrorCode } from "../../../shared/errors/error-codes";
import { IHashService } from "../../../shared/services/hash.service";
import { TokenType } from "../../token/domain/token.entity";
import { ITokenRepository } from "../../token/domain/token.repository.contract";
import { UserEntity } from "../../user/domain/user.entity";
import { IUserRepository } from "../../user/domain/user.repository.contract";

export interface IResetPasswordUseCase {
    execute(newPassword: string, rawToken: string): Promise<void>
}

export class ResetPasswordUseCase implements IResetPasswordUseCase {

    constructor(
        private readonly userRepo: IUserRepository,
        private readonly tokenRepo: ITokenRepository,
        private readonly hashService: IHashService
    ) { }

    async execute(newPassword: string, rawToken: string): Promise<void> {
        const storedToken = await this.tokenRepo.findValidBytokenAndType(rawToken, TokenType.PASSWORD_RESET)
        if (!storedToken) throw CustomError.badRequest('Invalid token', ErrorCode.TOKEN_INVALID);
        if (storedToken.expiresAt < new Date(Date.now())) throw CustomError.badRequest('Invalid token', ErrorCode.TOKEN_INVALID)

        const user = await this.userRepo.getById(storedToken.userId)

        const hashedPassword = this.hashService.hash(newPassword)

        const updatedUser = UserEntity.fromObject({
            ...user,
            password: hashedPassword,
        })

        await this.userRepo.save(updatedUser)
        await this.tokenRepo.markAsUsed(storedToken.id)
    }

}
