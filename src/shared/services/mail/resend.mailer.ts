import { Resend } from "resend"
import envs from "../../config/envs"
import { IMailer } from "./mail.service"
import { CustomError } from "../../errors/custom-errors"
import { UnrecoverableError } from "bullmq"

export class ResendMailer implements IMailer {
    private resend = new Resend(envs.RESEND_API_KEY)

    async send(to: string, subject: string, html: string): Promise<void> {
        const { data, error } = await this.resend.emails.send({
            from: envs.IN_PRODUCTION ? `${envs.DOMAIN}` : 'onboarding@resend.dev',
            to,
            subject,
            html
        })

        if (error) {
            if (!envs.IN_PRODUCTION) console.log(error);

            const permanentErrors = ["validation_error", "invalid_parameter", "invalid_region", "missing_required_field"]

            if (permanentErrors.includes(error.name)) {
                throw new UnrecoverableError(`Permanent mail error: ${error.message}`)
            }
            
            throw CustomError.forbidden(`error when sending mail: ${error.message}`)
        }

        if (!envs.IN_PRODUCTION && data) console.log(`Email sent, id: ${data.id}`)
    }
}