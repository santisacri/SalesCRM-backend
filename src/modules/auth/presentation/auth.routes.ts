import { Router } from "express";
import validateBody from "../../../shared/middlewares/validate-body.middleware";
import { forgotPasswordSchema, loginUserSchema, registerUserSchema } from "./auth.schemas";
import { authController } from "../../../shared/container/auth.container";


export class AuthRoutes {
    static get routes(): Router {
        const router = Router()

        router.post('/register', [validateBody(registerUserSchema)], authController.register)
        router.post('/login', [validateBody(loginUserSchema)], authController.login)
        router.get('/refresh', authController.refresh)
        router.post('/forgot-password', [validateBody(forgotPasswordSchema)], authController.forgotPassword)


        return router
    }
}