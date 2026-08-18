import { NextFunction, Request, Response } from "express"
import z, { ZodType } from "zod"
import { ErrorCode } from "../errors/error-codes"
import { CustomError } from "../errors/custom-errors"
import envs from "../config/envs"

const validateBody = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const { success, error, data } = schema.safeParse(req.body)

        if (!success) {
            if (envs.IN_PRODUCTION) {
                throw CustomError.badRequest('Invalid input', ErrorCode.VALIDATION_ERROR)
            }

            res.status(400).json({
                error: z.flattenError(error).fieldErrors,
                code: ErrorCode.VALIDATION_ERROR
            })

            return
        } else {
            req.body = data

            next()
        }
    }
}

export default validateBody