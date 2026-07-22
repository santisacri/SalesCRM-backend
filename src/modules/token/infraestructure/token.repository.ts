import { TOKEN_EXPIRATION_MS } from "../../../shared/config/constants";
import { TokenUtil } from "../../../shared/utils/token.util";
import { ITokenDatasource } from "../domain/token.datasource.contract";
import { TokenType, TokenEntity } from "../domain/token.entity";
import { ITokenRepository } from "../domain/token.repository.contract";


export class TokenRepository implements ITokenRepository {

    constructor(
        private readonly tokenDatasource: ITokenDatasource
    ) { }

    async createToken(tokenType: TokenType, userId: string): Promise<{ rawToken: string; }> {
        const rawToken = TokenUtil.generateToken()
        const hashedToken = TokenUtil.hash(rawToken)

        const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION_MS[tokenType])

        await this.tokenDatasource.createToken(tokenType, userId, hashedToken, expiresAt)

        return { rawToken }
    }
    findValidBytokenAndType(token: string, tokenType: TokenType): Promise<TokenEntity | null> {
        const hashedToken = TokenUtil.hash(token)

        return this.tokenDatasource.findValidByHashAndType(hashedToken, tokenType)
    }
    markAsUsed(id: string): Promise<void> {
        return this.tokenDatasource.markAsUsed(id)
    }
    invalidateAllByUserAndType(userId: string, tokenType: TokenType): Promise<void> {
        return this.tokenDatasource.invalidateAllByUserAndType(userId, tokenType)
    }

}