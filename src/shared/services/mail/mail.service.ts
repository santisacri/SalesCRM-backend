import envs from "../../config/envs"
import { invitationHTML } from "./templates/invitation.template"
import { resetPasswordHTML } from "./templates/reset-password.template"
import { verifyAccountHTML } from "./templates/verify-account.template"

export interface IMailService {
    sendVerifyAccountEmail(to: string, token: string, name: string): Promise<void>
    sendPasswordResetEmail(to: string, token: string, name: string): Promise<void>
    sendInvitationEmail(to: string, invitedByName: string, organizationName: string, hashedToken: string): Promise<void>
}

export interface IMailer {
    send(to: string, subject: string, html: string): Promise<void>
}

export class MailService implements IMailService {

    constructor(
        private readonly mailer: IMailer
    ) { }

    async sendInvitationEmail(to: string, invitedByName: string, organizationName: string, rawToken: string): Promise<void> {
        const url = new URL('/invitation', envs.FRONTEND_URL)
        url.searchParams.set('token', rawToken)

        const subject = `Invitation`
        const html = invitationHTML(invitedByName, organizationName, url)

        await this.mailer.send(to, subject, html)
    }

    async sendVerifyAccountEmail(to: string, token: string, name: string): Promise<void> {
        const url = `${envs.FRONTEND_URL}/auth/verify-account?token=${token}`
        const subject = `Verify account`
        const html = verifyAccountHTML(name, url)

        await this.mailer.send(to, subject, html)
    }

    async sendPasswordResetEmail(to: string, token: string, name: string): Promise<void> {
        const url = `${envs.FRONTEND_URL}/auth/reset-password?token=${token}`
        const subject = `Password reset`
        const html = resetPasswordHTML(name, url)

        await this.mailer.send(to, subject, html)
    }

}