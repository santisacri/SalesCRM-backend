import { IMailQueueService } from "../../../shared/queue/mail/mail-queue.service.contract";
import { IHashService } from "../../../shared/services/hash.service";
import { TokenType } from "../../token/domain/token.entity";
import { ITokenRepository } from "../../token/domain/token.repository.contract";
import { IUserRepository } from "../../user/domain/user.repository.contract";
import { TRegisterUser } from "../presentation/auth.schemas";

export interface IRegisterUserUseCase {
    execute(data: TRegisterUser): Promise<void>
}

export class RegisterUserUseCase implements IRegisterUserUseCase {

    constructor(
        private readonly userRepo: IUserRepository,
        private readonly tokenRepo: ITokenRepository,
        private readonly hashService: IHashService,
        private readonly mailQueueService: IMailQueueService
    ) { }

    async execute(data: TRegisterUser): Promise<void> {
        const { password, ...rest } = data

        const passwordHash = this.hashService.hash(password)

        const user = await this.userRepo.create({ password: passwordHash, ...rest })

        const { rawToken } = await this.tokenRepo.createToken(TokenType.EMAIL_VERIFICATION, user.id)

        await this.mailQueueService.enqueue('send-verify-email', { name: user.name, to: user.email, token: rawToken })
    }

}