import { IMailService } from "../../../shared/services/mail/mail.service";
import { TokenType } from "../../token/domain/token.entity";
import { ITokenRepository } from "../../token/domain/token.repository.contract";
import { IUserRepository } from "../../user/domain/user.repository.contract";

export interface IForgotPasswordUseCase {
    execute(email: string): Promise<void>
}

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {

    constructor(
        private readonly userRepo: IUserRepository,
        private readonly tokenRepo: ITokenRepository,
        private readonly mailService: IMailService
    ) { }

    async execute(email: string): Promise<void> {
        const user = await this.userRepo.findByEmail(email)
        if (!user) return;

        const { rawToken } = await this.tokenRepo.createToken(TokenType.PASSWORD_RESET, user.id)

        await this.mailService.sendPasswordResetEmail(user.email, rawToken, user.name)
    }

}