import { UserDatasource } from "../../modules/user/infraestructure/user.datasource";
import { prisma } from "../lib/prisma";


export const userDatasource = new UserDatasource(prisma)