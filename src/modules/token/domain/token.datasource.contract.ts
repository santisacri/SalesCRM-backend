import { TokenEntity, TokenType } from "./token.entity";

export interface ITokenDatasource {
    createToken(tokenType: TokenType, userId: string, tokenHash: string, expiresAt: Date): Promise<TokenEntity>
    findValidByHashAndType(tokenHash: string, tokenType: TokenType): Promise<TokenEntity | null>
    markAsUsed(id: string): Promise<void>
    invalidateAllByUserAndType(userId: string, tokenType: TokenType): Promise<void>
}