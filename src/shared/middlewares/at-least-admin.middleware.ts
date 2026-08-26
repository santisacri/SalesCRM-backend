import { Request, Response, NextFunction } from "express"
import { MembershipRoleEnum } from "../../modules/membership/domain/membership.entity"
import { CustomError } from "../errors/custom-errors"
import { ErrorCode } from "../errors/error-codes"

/**
 * Rejects users with *MEMBER* role.
 * 
 * This middleware must be used after `authMiddleware` and
 * `requireOrgMiddleware`, since it relies on `req.user`..
 */
export const atLeastAdminMidlleware = (req: Request, _res: Response, next: NextFunction) => {
    if (req.user.role === MembershipRoleEnum.MEMBER) {
        throw CustomError.forbidden("You can't perform this action", ErrorCode.INSUFFICIENT_ROLE)
    }

    next()
}