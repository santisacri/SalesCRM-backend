import { NextFunction, Request, Response } from "express";
import { IRegisterUserUseCase } from "../application/register-user.use-case";
import { ILoginUserUseCase } from "../application/login-user.use-case";
import { REFRESH_TOKEN_EXP } from "../../../shared/config/constants";
import { IRefreshUseCase } from "../application/refresh.use-case";
import { CustomError } from "../../../shared/errors/custom-errors";
import { IForgotPasswordUseCase } from "../application/forgot-password.use-case";
import { IResetPasswordUseCase } from "../application/reset-password.use-case";
import { ILogoutUseCase } from "../application/logout.use-case";
import { logoutQuerySchema } from "./auth.schemas";
import { IVerifyEmailUseCase } from "../application/verify-email.use-case";

type UseCases = {
    registerUser: IRegisterUserUseCase,
    loginUser: ILoginUserUseCase,
    refresh: IRefreshUseCase,
    forgotPassword: IForgotPasswordUseCase,
    resetPassword: IResetPasswordUseCase,
    logout: ILogoutUseCase,
    verifyEmail: IVerifyEmailUseCase
}

export class AuthController {

    constructor(
        private readonly useCases: UseCases
    ) { }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.useCases.registerUser.execute(req.body)
            res.status(201).json({ message: 'Registered successfully, check your email to verify your account' })
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

    forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body
            await this.useCases.forgotPassword.execute(email)
            res.status(200).json({ message: 'If your email is registered, we will send you a link to reset your password' })
        } catch (error) {
            next(error)
        }
    }

    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { newPassword, token } = req.body
            await this.useCases.resetPassword.execute(newPassword, token)
            res.status(200).json({ message: 'Password has been successfully reset' })
        } catch (error) {
            next(error)
        }
    }

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const global = logoutQuerySchema.parse(req.query.global)
            const { id } = req.user!
            const { refreshToken } = req.cookies

            await this.useCases.logout.execute(global, id, refreshToken)
            res.status(200).json({ message: 'Logged out successfully' })
        } catch (error) {
            next(error)
        }
    }

    verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token } = req.body
            await this.useCases.verifyEmail.execute(token)
            res.status(200).json({ message: 'Email verified successfully' })
        } catch (error) {
            next(error)
        }
    }
}