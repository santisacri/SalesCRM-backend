import { NextFunction, Request, Response } from "express"
import z, { ZodType } from "zod"
import { ErrorCode } from "../errors/error-codes"

const validateBody = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const { success, error, data } = schema.safeParse(req.body)

        if (!success) {
            res.status(400).json({
                error: z.flattenError(error).fieldErrors,
                code: ErrorCode.VALIDATION_ERROR
            })
        }

        req.body = data

        next()
    }
}

export default validateBody