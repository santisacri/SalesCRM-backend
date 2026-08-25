import { NextFunction, Request, Response } from "express"
import { CustomError } from "../errors/custom-errors"
import envs from "../config/envs"

const errorMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof CustomError) {
        if (!envs.IN_PRODUCTION) console.log(err)
        res.status(err.statusCode).json({
            message: err.message,
            code: err.code
        })
        return
    }

    console.log(err)
    console.log(`Unexpected Error: ${err}`)
    res.status(500).json({ message: 'Internal Server Error' })
    return
}

export default errorMiddleware