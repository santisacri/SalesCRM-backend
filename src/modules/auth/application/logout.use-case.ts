import { CustomError } from "../../../shared/errors/custom-errors";
import { ErrorCode } from "../../../shared/errors/error-codes";
import { IRefreshTokenRepository } from "../domain/refresh-token.repository.contract";

export interface ILogoutUseCase {
    execute(global: boolean, userId: string, rawRefreshToken: string): Promise<void>
}

export class LogoutUseCase implements ILogoutUseCase {

    constructor(
        private readonly refreshTokenRepo: IRefreshTokenRepository
    ) { }

    async execute(global: boolean, userId: string, rawRefreshToken: string): Promise<void> {
        if (global) {
            await this.refreshTokenRepo.revokeByUserId(userId)
        } else {
            const stored = await this.refreshTokenRepo.findByToken(rawRefreshToken)
            if (!stored) throw CustomError.badRequest('Invalid token', ErrorCode.TOKEN_INVALID);

            await this.refreshTokenRepo.revokeById(stored.id)
        }
    }
}