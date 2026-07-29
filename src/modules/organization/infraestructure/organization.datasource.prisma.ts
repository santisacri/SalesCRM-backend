import { PrismaClient } from "../../../generated/prisma/client";
import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { IOrganizationDatasource } from "../domain/organization.datasource.contract";
import { OrganizationEntity } from "../domain/organization.entity";
import handlePrismaError from "../../../shared/errors/prisma-errors";


export class OrganizationDatasource implements IOrganizationDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    async createOrg(name: string, tx?: PrismaTransactionClient): Promise<OrganizationEntity> {
        try {
            const client = tx ?? this.prisma

            const org = await client.organization.create({
                data: { name }
            })

            return OrganizationEntity.fromObject(org)
        } catch (error) {
            handlePrismaError(error)
        }
    }

}