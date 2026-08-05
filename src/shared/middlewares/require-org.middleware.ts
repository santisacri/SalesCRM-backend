import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-errors";
import { ErrorCode } from "../errors/error-codes";

export default function requireOrgMiddleware(req: Request, _res: Response, next: NextFunction) {

    const { organizationId, role } = req.user

    if (!organizationId || !role) throw CustomError.unauthorized('Organization not selected', ErrorCode.ORGANIZATION_NOT_SELECTED);

    next()
}