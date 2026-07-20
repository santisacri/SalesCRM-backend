import { IRefreshTokenDatasource } from "../domain/refresh-token.datasource.contract";
import { RefreshTokenEntity } from "../domain/refresh-token.entity";
import { IRefreshTokenRepository } from "../domain/refresh-token.repository.contract";


export class RefreshTokenRepository implements IRefreshTokenRepository {

    constructor(
        private readonly refreshTokenDatasource: IRefreshTokenDatasource
    ) { }

    async create(data: { token: string; userId: string; family: string; }): Promise<RefreshTokenEntity> {
        return this.refreshTokenDatasource.create(data)
    }
    async findByToken(token: string): Promise<RefreshTokenEntity | null> {
        return this.refreshTokenDatasource.findByToken(token)
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