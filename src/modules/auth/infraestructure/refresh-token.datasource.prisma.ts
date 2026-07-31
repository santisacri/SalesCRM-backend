import { IRefreshTokenDatasource } from "../domain/refresh-token.datasource.contract";
import { RefreshTokenEntity } from "../domain/refresh-token.entity";
import handlePrismaError from "../../../shared/errors/prisma-errors";
import { PrismaClient } from "../../../generated/prisma/client";
import { REFRESH_TOKEN_EXP } from "../../../shared/config/constants";


export class RefreshTokenDatasource implements IRefreshTokenDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }


    async updateOrganization(token: string, organizationId: string): Promise<void> {
        try {
            await this.prisma.refreshToken.update({
                where: { token },
                data: { organizationId }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async create(data: { token: string; userId: string; family: string; organizationId?: string }): Promise<RefreshTokenEntity> {
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

    async findByToken(token: string): Promise<RefreshTokenEntity | null> {
        try {
            const refreshToken = await this.prisma.refreshToken.findUnique({
                where: { token }
            })

            if (!refreshToken) return null

            return RefreshTokenEntity.fromObject(refreshToken)
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async revokeById(id: string): Promise<void> {
        try {
            await this.prisma.refreshToken.update({
                where: { id },
                data: { revoked: true }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async revokeFamily(family: string): Promise<void> {
        try {
            await this.prisma.refreshToken.updateMany({
                where: { family },
                data: { revoked: true }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async revokeByUserId(userId: string): Promise<void> {
        try {
            await this.prisma.refreshToken.updateMany({
                where: { userId, revoked: false },
                data: { revoked: true }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }

}