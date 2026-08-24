import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-errors";
import { ErrorCode } from "../errors/error-codes";
import { MembershipRoleEnum } from "../../modules/membership/domain/membership.entity";

/**
 * Validates that the user is the organization's owner.
 *
 * This middleware must be used after `authMiddleware` and
 * `requireOrgMiddleware`, since it relies on `req.user`.
 */
export default function onlyOwnerMiddleware(req: Request, _res: Response, next: NextFunction) {

    const { role } = req.user

    if (role !== MembershipRoleEnum.OWNER) throw CustomError.forbidden("You can't perform this action", ErrorCode.INSUFFICIENT_ROLE);

    next()
}