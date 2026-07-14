import { RefreshTokenRepository } from "../../modules/auth/infraestructure/refresh-token.repository";
import { UserRepository } from "../../modules/user/infraestructure/user.repository";
import { refreshTokenDatasource, userDatasource } from "./datasources.container";



export const userRepository = new UserRepository(userDatasource)
export const refreshTokenRepository = new RefreshTokenRepository(refreshTokenDatasource)