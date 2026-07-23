import { IMailQueueService } from "../../../shared/queue/mail/mail-queue.service.contract";
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
        private readonly mailQueueService: IMailQueueService
    ) { }

    async execute(email: string): Promise<void> {
        const user = await this.userRepo.findByEmail(email)
        if (!user) return;

        const { rawToken } = await this.tokenRepo.createToken(TokenType.PASSWORD_RESET, user.id)

        await this.mailQueueService.enqueue('send-reset-password-email', {
            to: user.email,
            token: rawToken,
            name: user.name
        }, {
            attempts: 3,
            backoff: { type: "exponential", delay: 2000 }
        })
    }

}