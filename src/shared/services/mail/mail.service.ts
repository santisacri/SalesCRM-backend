import envs from "../../config/envs"
import { resetPasswordHTML } from "./templates/reset-password.template"

export interface IMailService {
    sendPasswordResetEmail(to: string, token: string, name: string): Promise<void>
}

export interface IMailer {
    send(to: string, subject: string, html: string): Promise<void>
}

export class MailService implements IMailService {

    constructor(
        private readonly mailer: IMailer
    ) { }

    async sendPasswordResetEmail(to: string, token: string, name: string): Promise<void> {
        const url = `${envs.FRONTEND_URL}/auth/reset-password?token=${token}`
        const subject = `Password reset`
        const html = resetPasswordHTML(name, url)

        await this.mailer.send(to, subject, html)
    }

}