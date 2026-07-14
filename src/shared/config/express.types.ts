import { UserEntity } from "../../modules/user/domain/user.entity"

declare global {
    namespace Express {
        interface Request {
            user?: UserEntity
        }
    }
}

export { }