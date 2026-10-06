import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-errors";
import { ErrorCode } from "../errors/error-codes";
import { MembershipRoleEnum } from "../../modules/membership/domain/membership.entity";

export default function requireTeamMiddleware(req: Request, _res: Response, next: NextFunction) {

    const { teamId, role } = req.user

    if (role !== MembershipRoleEnum.OWNER && !teamId) throw CustomError.forbidden('You need to belong to a team in order to proceed', ErrorCode.ORGANIZATION_NOT_SELECTED);


    next()
}