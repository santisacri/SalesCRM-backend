import { LoginUserUseCase } from "../../modules/auth/application/login-user.use-case";
import { RegisterUserUseCase } from "../../modules/auth/application/register-user.use-case";
import { AuthController } from "../../modules/auth/presentation/auth.controller";
import { refreshTokenRepository, userRepository } from "./repositories.container";
import { hashService, jwtService } from "./services.container";

const registerUser = new RegisterUserUseCase(userRepository, hashService)
const loginUser = new LoginUserUseCase(userRepository, refreshTokenRepository, hashService, jwtService)

export const authController = new AuthController({ registerUser, loginUser })