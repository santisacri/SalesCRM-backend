import { CustomError } from "../../../shared/errors/custom-errors";
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
            if (!stored) throw CustomError.unauthorized('Invalid token');

            await this.refreshTokenRepo.revokeById(stored.id)
        }
    }
}