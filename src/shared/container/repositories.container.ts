import { UserRepository } from "../../modules/user/infraestructure/user.repository";
import { userDatasource } from "./datasources.container";



export const userRepository = new UserRepository(userDatasource)