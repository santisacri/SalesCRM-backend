import { RefreshTokenEntity } from "./refresh-token.entity";

export interface IRefreshTokenDatasource {
    create(data: { token: string, userId: string, family: string, organizationId?: string }): Promise<RefreshTokenEntity>
    findByToken(token: string): Promise<RefreshTokenEntity | null>
    revokeById(id: string): Promise<void>
    revokeFamily(family: string): Promise<void>
    revokeByUserId(userId: string): Promise<void>
    updateOrganization(token: string, organizationId: string): Promise<void>
}