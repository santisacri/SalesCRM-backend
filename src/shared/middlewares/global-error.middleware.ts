import { NextFunction, Request, Response } from "express"
import { CustomError } from "../errors/custom-errors"
import envs from "../config/envs"

const errorLog = (error: CustomError) => {
    return `CustomError = {  
    message: ${error.message},  
    stack: ${error.stack},
    date: ${new Date(Date.now()).toLocaleString('es-AR')},
}`
}

const errorMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof CustomError) {
        if (!envs.IN_PRODUCTION) errorLog(err)
        res.status(err.statusCode).json({
            message: err.message
        })
    }

    console.log(`Unexpected Error: ${err}`)
    res.status(500).json({ message: 'Internal Server Error' })
}

export default errorMiddleware