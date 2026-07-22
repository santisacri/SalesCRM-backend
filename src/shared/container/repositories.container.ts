import { RefreshTokenRepository } from "../../modules/auth/infraestructure/refresh-token.repository";
import { TokenRepository } from "../../modules/token/infraestructure/token.repository";
import { UserRepository } from "../../modules/user/infraestructure/user.repository";
import { refreshTokenDatasource, tokenDatasource, userDatasource } from "./datasources.container";



export const userRepository = new UserRepository(userDatasource)
export const refreshTokenRepository = new RefreshTokenRepository(refreshTokenDatasource)
export const tokenRepository = new TokenRepository(tokenDatasource)