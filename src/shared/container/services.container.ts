import { HashService } from "../services/hash.service";
import { JWTService } from "../services/jwt.service";
import { MailService } from "../services/mail/mail.service";
import { ResendMailer } from "../services/mail/resend.mailer";


export const hashService = new HashService()
export const jwtService = new JWTService()
export const mailService = new MailService(new ResendMailer())