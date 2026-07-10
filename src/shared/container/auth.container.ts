import { RegisterUserUseCase } from "../../modules/auth/application/register-user.use-case";
import { AuthController } from "../../modules/auth/presentation/auth.controller";
import { userRepository } from "./repositories.container";
import { hashService } from "./services.container";

const registerUser = new RegisterUserUseCase(userRepository, hashService)

export const authController = new AuthController({ registerUser })