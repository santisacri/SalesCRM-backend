import { ITokenDatasource } from "../domain/token.datasource.contract";
import { TokenType, TokenEntity } from "../domain/token.entity";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { PrismaClient, Token } from "../../../generated/prisma/client";


export class TokenDatasource implements ITokenDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    toEntity(storedToken: Token): TokenEntity {
        return TokenEntity.fromObject({
            ...storedToken,
            type: TokenType[storedToken.type]
        })
    }

    async createToken(tokenType: TokenType, userId: string, tokenHash: string, expiresAt: Date): Promise<TokenEntity> {
        try {
            const newToken = await this.prisma.token.create({
                data: {
                    tokenHash,
                    type: tokenType,
                    userId,
                    expiresAt
                }
            })

            return this.toEntity(newToken)
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async findValidByHashAndType(tokenHash: string, tokenType: TokenType): Promise<TokenEntity | null> {
        try {
            const stored = await this.prisma.token.findUnique({
                where: { tokenHash, type: tokenType, usedAt: null }
            })

            if (!stored) return null;

            return this.toEntity(stored)
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async markAsUsed(id: string): Promise<void> {
        try {
            await this.prisma.token.update({
                where: { id },
                data: { usedAt: new Date(Date.now()) }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async invalidateAllByUserAndType(userId: string, tokenType: TokenType): Promise<void> {
        try {
            await this.prisma.token.updateMany({
                where: { userId, type: tokenType },
                data: { usedAt: new Date(Date.now()) }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }

}