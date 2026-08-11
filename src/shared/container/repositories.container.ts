import { ActivityRepository } from "../../modules/activity/infraestructure/activity.repository";
import { RefreshTokenRepository } from "../../modules/auth/infraestructure/refresh-token.repository";
import { ContactRepository } from "../../modules/contact/infraestructure/contact.repository";
import { DealRepository } from "../../modules/deal/infraestructure/deal.repository";
import { MembershipRepository } from "../../modules/membership/infraestructure/membership.repository";
import { OrganizationRepository } from "../../modules/organization/infraestructure/organization.repository";
import { TokenRepository } from "../../modules/token/infraestructure/token.repository";
import { UserRepository } from "../../modules/user/infraestructure/user.repository";
import { activityDatasource, contactDatasource, dealDatasource, membershipDatasource, organizationDatasource, refreshTokenDatasource, tokenDatasource, userDatasource } from "./datasources.container";



export const userRepository = new UserRepository(userDatasource)
export const refreshTokenRepository = new RefreshTokenRepository(refreshTokenDatasource)
export const tokenRepository = new TokenRepository(tokenDatasource)
export const organizationRepository = new OrganizationRepository(organizationDatasource)
export const membershipRepository = new MembershipRepository(membershipDatasource)
export const contactRepository = new ContactRepository(contactDatasource)
export const dealRepository = new DealRepository(dealDatasource)
export const activityRepository = new ActivityRepository(activityDatasource)