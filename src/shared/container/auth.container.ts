import { ForgotPasswordUseCase } from "../../modules/auth/application/forgot-password.use-case";
import { LoginUserUseCase } from "../../modules/auth/application/login-user.use-case";
import { LogoutUseCase } from "../../modules/auth/application/logout.use-case";
import { RefreshUseCase } from "../../modules/auth/application/refresh.use-case";
import { RegisterUserUseCase } from "../../modules/auth/application/register-user.use-case";
import { ResetPasswordUseCase } from "../../modules/auth/application/reset-password.use-case";
import { VerifyEmailUseCase } from "../../modules/auth/application/verify-email.use-case";
import { AuthController } from "../../modules/auth/presentation/auth.controller";
import { SelectOrganizationUseCase } from "../../modules/membership/application/select-organization.use-case";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { mailQueueService } from "./queue.container";
import { membershipRepository, refreshTokenRepository, tokenRepository, userRepository } from "./repositories.container";
import { hashService, jwtService } from "./services.container";

export const authMiddleware = new AuthMiddleware(userRepository, membershipRepository, jwtService).validate

const registerUser = new RegisterUserUseCase(userRepository, tokenRepository, hashService, mailQueueService)
const loginUser = new LoginUserUseCase(userRepository, refreshTokenRepository, hashService, jwtService)
const refresh = new RefreshUseCase(refreshTokenRepository, membershipRepository, jwtService)
const forgotPassword = new ForgotPasswordUseCase(userRepository, tokenRepository, mailQueueService)
const resetPassword = new ResetPasswordUseCase(userRepository, tokenRepository, hashService)
const logout = new LogoutUseCase(refreshTokenRepository)
const verifyEmail = new VerifyEmailUseCase(tokenRepository, userRepository)
const selectOrganization = new SelectOrganizationUseCase(membershipRepository, refreshTokenRepository, jwtService)

export const authController = new AuthController({
    registerUser,
    loginUser,
    refresh,
    forgotPassword,
    resetPassword,
    logout,
    verifyEmail,
    selectOrganization
})