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
    findByToken(token: string): Promise<RefreshTokenEntity | null> {
        throw new Error("Method not implemented.");
    }
    revokeById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    revokeFamily(familyId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}