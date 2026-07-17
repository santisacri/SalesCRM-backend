import { IMailService } from "../../../shared/services/mail/mail.service";
import { TokenUtil } from "../../../shared/utils/token.util";
import { IUserRepository } from "../../user/domain/user.repository.contract";

export interface IForgotPasswordUseCase {
    execute(email: string): Promise<void>
}

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {

    constructor(
        private readonly userRepo: IUserRepository,
        private readonly mailService: IMailService
    ) { }

    async execute(email: string): Promise<void> {
        const user = await this.userRepo.findByEmail(email)
        if (!user) return

        const rawPasswordResetToken = TokenUtil.generateToken()
        const hashed = TokenUtil.hash(rawPasswordResetToken)

        await this.userRepo.setPasswordResetToken(hashed, user.id)

        await this.mailService.sendPasswordResetEmail(user.email, rawPasswordResetToken, user.name)
    }

}