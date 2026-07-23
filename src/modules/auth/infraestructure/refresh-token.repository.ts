import { TokenUtil } from "../../../shared/utils/token.util";
import { IRefreshTokenDatasource } from "../domain/refresh-token.datasource.contract";
import { RefreshTokenEntity } from "../domain/refresh-token.entity";
import { IRefreshTokenRepository } from "../domain/refresh-token.repository.contract";


export class RefreshTokenRepository implements IRefreshTokenRepository {

    constructor(
        private readonly refreshTokenDatasource: IRefreshTokenDatasource
    ) { }

    async create(userId: string): Promise<{ rawRefreshToken: string }> {

        const rawRefreshToken = TokenUtil.generateToken()
        const hashedToken = TokenUtil.hash(rawRefreshToken)
        const family = crypto.randomUUID()

        await this.refreshTokenDatasource.create({ family, token: hashedToken, userId })

        return { rawRefreshToken }
    }
    async findByToken(token: string): Promise<RefreshTokenEntity | null> {

        const hashed = TokenUtil.hash(token)

        return this.refreshTokenDatasource.findByToken(hashed)
    }
    async revokeById(id: string): Promise<void> {
        return this.refreshTokenDatasource.revokeById(id)
    }
    async revokeFamily(family: string): Promise<void> {
        return this.refreshTokenDatasource.revokeFamily(family)
    }
    async revokeByUserId(userId: string): Promise<void> {
        return this.refreshTokenDatasource.revokeByUserId(userId)
    }
}