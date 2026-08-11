import { ActivityDatasource } from "../../modules/activity/infraestructure/activity.datasource.prisma";
import { RefreshTokenDatasource } from "../../modules/auth/infraestructure/refresh-token.datasource.prisma";
import { ContactDatasource } from "../../modules/contact/infraestructure/contact.datasource.prisma";
import { DealDatasource } from "../../modules/deal/infraestructure/deal.datasource.prisma";
import { MembershipDatasource } from "../../modules/membership/infraestructure/membership.datasource.prisma";
import { OrganizationDatasource } from "../../modules/organization/infraestructure/organization.datasource.prisma";
import { TokenDatasource } from "../../modules/token/infraestructure/token.datasource.prisma";
import { UserDatasource } from "../../modules/user/infraestructure/user.datasource.prisma";
import { prisma } from "../lib/prisma";


export const userDatasource = new UserDatasource(prisma)
export const refreshTokenDatasource = new RefreshTokenDatasource(prisma)
export const tokenDatasource = new TokenDatasource(prisma)
export const organizationDatasource = new OrganizationDatasource(prisma)
export const membershipDatasource = new MembershipDatasource(prisma)
export const contactDatasource = new ContactDatasource(prisma)
export const dealDatasource = new DealDatasource(prisma)
export const activityDatasource = new ActivityDatasource(prisma)