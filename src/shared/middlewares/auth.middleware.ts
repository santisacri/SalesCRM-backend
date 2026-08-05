import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-errors";
import { IUserRepository } from "../../modules/user/domain/user.repository.contract";
import { IJWTService } from "../services/jwt.service";
import { IMembershipRepository } from "../../modules/membership/domain/membership.repository.contract";
import { ErrorCode } from "../errors/error-codes";


export class AuthMiddleware {
    constructor(
        private readonly userRepo: IUserRepository,
        private readonly membershipRepo: IMembershipRepository,
        private readonly jwtService: IJWTService
    ) { }


    validate = async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const token = this.extractToken(req);
            if (!token) throw CustomError.unauthorized('invalid token', ErrorCode.TOKEN_INVALID)

            const payload = this.jwtService.verify(token)

            const [user, membership] = await Promise.all([
                this.userRepo.getById(payload.sub),
                payload.organizationId
                    ? this.membershipRepo.findActive(payload.sub, payload.organizationId)
                    : Promise.resolve(null),
            ]);

            if (payload.organizationId && !membership) throw CustomError.unauthorized('You dont have access to this organization');

            req.user = {
                entity: user,
                organizationId: membership ? membership.organizationId : undefined,
                role: membership ? membership.role : undefined,
            };

            next();
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.unauthorized()
        }
    }

    private extractToken(req: Request): string | null {
        const header = req.headers.authorization;
        if (!header?.startsWith("Bearer ")) return null;
        return header.split(" ")[1];
    }
}