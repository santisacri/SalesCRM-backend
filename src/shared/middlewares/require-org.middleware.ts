import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-errors";

export default function requireOrgMiddleware(req: Request, _res: Response, next: NextFunction) {

    const { organizationId, role } = req.user

    if (!organizationId || !role) throw CustomError.unauthorized('Organization not selected');

    next()
}