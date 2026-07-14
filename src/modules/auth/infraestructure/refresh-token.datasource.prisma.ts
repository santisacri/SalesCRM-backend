import { IRefreshTokenDatasource } from "../domain/refresh-token.datasource.contract";
import { RefreshTokenEntity } from "../domain/refresh-token.entity";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { PrismaClient } from "../../../generated/prisma/client";
import { REFRESH_TOKEN_EXP } from "../../../shared/config/constants";


export class RefreshTokenDatasource implements IRefreshTokenDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    async create(data: { token: string; userId: string; family: string; }): Promise<RefreshTokenEntity> {
        try {
            const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXP * 1000)
            const refreshToken = await this.prisma.refreshToken.create({
                data: { ...data, expiresAt }
            })

            return RefreshTokenEntity.fromObject(refreshToken)
        } catch (error) {
            handlePrismaError(error)
        }
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