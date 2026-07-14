import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-errors";
import { IUserRepository } from "../../modules/user/domain/user.repository.contract";
import { IJWTService } from "../services/jwt.service";


export class AuthMiddleware {
    constructor(
        private readonly userRepo: IUserRepository,
        private readonly jwtService: IJWTService
    ) { }


    validate = async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ').at(1)

            if (!token) throw CustomError.unauthorized('Missing auth token')

            const payload = this.jwtService.verify(token)

            const user = await this.userRepo.getById(payload.sub)

            req.user = user

            next()
        } catch (error) {
            if (error instanceof CustomError) {
                throw error
            }

            throw CustomError.badRequest()
        }
    }
}