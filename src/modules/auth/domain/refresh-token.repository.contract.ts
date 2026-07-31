import { RefreshTokenEntity } from "./refresh-token.entity";

export interface IRefreshTokenRepository {
    create(userId: string, organizationId?: string): Promise<{ rawRefreshToken: string }>
    findByToken(rawToken: string): Promise<RefreshTokenEntity | null>
    revokeById(id: string): Promise<void>
    revokeFamily(family: string): Promise<void>
    revokeByUserId(userId: string): Promise<void>
    updateOrganization(rawToken: string, organizationId: string): Promise<void>
}