import { CustomError } from "../errors/custom-errors";
import { ErrorCode } from "../errors/error-codes";
import { OrgScopedCtx } from "../types/context.types";
import { Request } from "express";

const getContext = (req: Request): OrgScopedCtx => {
    if (!req.user.organizationId || !req.user.role || !req.user.teamId) throw CustomError.forbidden("Select organization", ErrorCode.ORGANIZATION_NOT_SELECTED);

    return {
        organizationId: req.user.organizationId,
        role: req.user.role,
        userId: req.user.entity.id,
        teamId: req.user.teamId
    }
}

export default getContext