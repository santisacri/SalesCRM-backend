import { CustomError } from "../../../shared/errors/custom-errors";
import { TokenType } from "../../token/domain/token.entity";
import { ITokenRepository } from "../../token/domain/token.repository.contract";
import { UserEntity } from "../../user/domain/user.entity";
import { IUserRepository } from "../../user/domain/user.repository.contract";

export interface IVerifyEmailUseCase {
    execute(token: string): Promise<void>
}

export class VerifyEmailUseCase implements IVerifyEmailUseCase {

    constructor(
        private readonly tokenRepo: ITokenRepository,
        private readonly userRepo: IUserRepository
    ) { }

    async execute(token: string): Promise<void> {
        const storedToken = await this.tokenRepo.findValidBytokenAndType(token, TokenType.EMAIL_VERIFICATION)

        if (!storedToken) throw CustomError.unauthorized('Invalid token');
        if (storedToken.expiresAt < new Date(Date.now())) throw CustomError.unauthorized('Invalid token');

        const user = await this.userRepo.getById(storedToken.userId)

        const updatedUser = UserEntity.fromObject({ ...user, emailVerified: true })
        
        await this.userRepo.save(updatedUser)
        await this.tokenRepo.markAsUsed(storedToken.id)
    }

}