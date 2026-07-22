import { RefreshTokenDatasource } from "../../modules/auth/infraestructure/refresh-token.datasource.prisma";
import { TokenDatasource } from "../../modules/token/infraestructure/token.datasource.prisma";
import { UserDatasource } from "../../modules/user/infraestructure/user.datasource.prisma";
import { prisma } from "../lib/prisma";


export const userDatasource = new UserDatasource(prisma)
export const refreshTokenDatasource = new RefreshTokenDatasource(prisma)
export const tokenDatasource = new TokenDatasource(prisma)