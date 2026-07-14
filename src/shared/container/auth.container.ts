import { LoginUserUseCase } from "../../modules/auth/application/login-user.use-case";
import { RefreshUseCase } from "../../modules/auth/application/refresh.use-case";
import { RegisterUserUseCase } from "../../modules/auth/application/register-user.use-case";
import { AuthController } from "../../modules/auth/presentation/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { refreshTokenRepository, userRepository } from "./repositories.container";
import { hashService, jwtService } from "./services.container";

export const authMiddleware = new AuthMiddleware(userRepository, jwtService).validate

const registerUser = new RegisterUserUseCase(userRepository, hashService)
const loginUser = new LoginUserUseCase(userRepository, refreshTokenRepository, hashService, jwtService)
const refresh = new RefreshUseCase(refreshTokenRepository, jwtService)

export const authController = new AuthController({ registerUser, loginUser, refresh })