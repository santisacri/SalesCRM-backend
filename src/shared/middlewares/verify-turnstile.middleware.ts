import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/custom-errors"
import { ErrorCode } from "../errors/error-codes"
import { ITurnstileService } from "../services/turnstile.service"

export default class verifyTurnstileMiddleware {

    constructor(
        private readonly turnstileService: ITurnstileService
    ) { }

    verify = async (req: Request, _res: Response, next: NextFunction) => {
        const { turnstileToken } = req.body

        if (!turnstileToken) {
            throw CustomError.badRequest('Missing captcha verification', ErrorCode.VALIDATION_ERROR)
        }

        const isValid = await this.turnstileService.verify(turnstileToken, req.ip)

        if (!isValid) {
            throw CustomError.badRequest('Captcha verification failed', ErrorCode.VALIDATION_ERROR)
        }

        next()
    }
}