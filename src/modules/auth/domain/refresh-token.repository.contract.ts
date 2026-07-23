import { RefreshTokenEntity } from "./refresh-token.entity";

export interface IRefreshTokenRepository {
    create(userId: string): Promise<{ rawRefreshToken: string }>
    findByToken(token: string): Promise<RefreshTokenEntity | null>
    revokeById(id: string): Promise<void>
    revokeFamily(family: string): Promise<void>
    revokeByUserId(userId: string): Promise<void>
}