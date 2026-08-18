import { CustomError } from "../errors/custom-errors";
import { ErrorCode } from "../errors/error-codes";
import { Ctx } from "../types/context.types";
import { Request } from "express";

const getContext = (req: Request): Ctx => {
    if (!req.user.organizationId || !req.user.role) throw CustomError.forbidden("Select organization", ErrorCode.ORGANIZATION_NOT_SELECTED);

    return {
        organizationId: req.user.organizationId,
        role: req.user.role,
        userId: req.user.entity.id
    }
}

export default getContext