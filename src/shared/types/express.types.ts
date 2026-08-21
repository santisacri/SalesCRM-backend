import { MembershipRoleEnum } from "../../modules/membership/domain/membership.entity"
import { UserEntity } from "../../modules/user/domain/user.entity";

declare global {
    namespace Express {
        interface Request {
            user: {
                entity: UserEntity;
                organizationId: string | null;
                role: MembershipRoleEnum | null;
                teamId: string | null;
            };
        }
    }
}

export { }