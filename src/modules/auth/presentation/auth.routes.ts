import { Router } from "express";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { forgotPasswordSchema, loginUserSchema, registerUserSchema, resetPasswordSchema, verifyEmailSchema } from "./auth.schemas";
import { authController, authMiddleware } from "../../../shared/container/auth.container";


export class AuthRouter {
    static get routes(): Router {
        const router = Router()

        router.post('/register', [validateBody(registerUserSchema)], authController.register)
        router.post('/login', [validateBody(loginUserSchema)], authController.login)
        router.get('/refresh', authController.refresh)
        router.post('/forgot-password', [validateBody(forgotPasswordSchema)], authController.forgotPassword)
        router.post('/reset-password', [validateBody(resetPasswordSchema)], authController.resetPassword)
        router.post('/logout', [authMiddleware], authController.logout)
        router.post('/verify-email', [validateBody(verifyEmailSchema)], authController.verifyEmail)


        return router
    }
}