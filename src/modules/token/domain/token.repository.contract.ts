import { TokenEntity, TokenType } from "./token.entity"

export interface ITokenRepository {
    createToken(tokenType: TokenType, userId: string): Promise<{ rawToken: string }>
    findValidBytokenAndType(token: string, tokenType: TokenType): Promise<TokenEntity | null>
    markAsUsed(id: string): Promise<void>
    invalidateAllByUserAndType(userId: string, tokenType: TokenType): Promise<void>
}