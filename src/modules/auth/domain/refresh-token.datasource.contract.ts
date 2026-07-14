import { RefreshTokenEntity } from "./refresh-token.entity";

export interface IRefreshTokenDatasource {
    create(data: { token: string, userId: string, family: string }): Promise<RefreshTokenEntity>
    findByToken(token: string): Promise<RefreshTokenEntity | null>
    revokeById(id: string): Promise<void>
    revokeFamily(familyId: string): Promise<void>
}