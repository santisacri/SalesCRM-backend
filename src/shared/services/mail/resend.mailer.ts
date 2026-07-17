import { Resend } from "resend"
import envs from "../../config/envs"
import { IMailer } from "./mail.service"

export class ResendMailer implements IMailer {
    private resend = new Resend(envs.RESEND_API_KEY)

    async send(to: string, subject: string, html: string): Promise<void> {
        const { data, error } = await this.resend.emails.send({
            from: envs.IN_PRODUCTION ? `${envs.DOMAIN}` : 'onboarding@resend.dev',
            to,
            subject,
            html
        })

        if (!envs.IN_PRODUCTION && error) console.log(error)
        if (!envs.IN_PRODUCTION && data) console.log(`Email sent, id: ${data.id}`)
    }
}