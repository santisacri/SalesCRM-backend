import { NextFunction, Request, Response } from "express";
import { IRegisterUserUseCase } from "../application/register-user.use-case";
import { ILoginUserUseCase } from "../application/login-user.use-case";
import { REFRESH_TOKEN_EXP } from "../../../shared/config/constants";
import { IRefreshUseCase } from "../application/refresh.use-case";
import { CustomError } from "../../../shared/errors/custom-errors";

type UseCases = {
    registerUser: IRegisterUserUseCase,
    loginUser: ILoginUserUseCase,
    refresh: IRefreshUseCase
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

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user, refreshToken, accessToken } = await this.useCases.loginUser.execute(req.body)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: REFRESH_TOKEN_EXP * 1000
            })

            res.status(200).json({ user, accessToken })
        } catch (error) {
            next(error)
        }
    }

    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshToken = req.cookies.refreshToken

            if (!refreshToken) throw CustomError.badRequest('Missing Refresh token')

            const { accessToken, rawRefreshToken } = await this.useCases.refresh.execute(refreshToken)

            res.cookie('refreshToken', rawRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: REFRESH_TOKEN_EXP * 1000
            })

            res.json({ accessToken })
        } catch (error) {
            next(error)
        }
    }
}