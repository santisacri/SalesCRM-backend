import { RefreshTokenRepository } from "../../modules/auth/infraestructure/refresh-token.repository";
import { MembershipRepository } from "../../modules/membership/infraestructure/membership.repository";
import { OrganizationRepository } from "../../modules/organization/infraestructure/organization.repository";
import { TokenRepository } from "../../modules/token/infraestructure/token.repository";
import { UserRepository } from "../../modules/user/infraestructure/user.repository";
import { membershipDatasource, organizationDatasource, refreshTokenDatasource, tokenDatasource, userDatasource } from "./datasources.container";



export const userRepository = new UserRepository(userDatasource)
export const refreshTokenRepository = new RefreshTokenRepository(refreshTokenDatasource)
export const tokenRepository = new TokenRepository(tokenDatasource)
export const organizationRepository = new OrganizationRepository(organizationDatasource)
export const membershipRepository = new MembershipRepository(membershipDatasource)