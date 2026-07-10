import { NextFunction, Request, Response } from "express";
import { IRegisterUserUseCase } from "../application/register-user.use-case";

type UseCases = {
    registerUser: IRegisterUserUseCase
}

export class AuthController {

    constructor(
        private readonly useCases: UseCases
    ) { }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.useCases.registerUser.execute(req.body)
            res.status(201).json({ message: 'Registered successfully' })
        } catch (error) {
            next(error)
        }
    }
}