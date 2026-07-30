import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { OrganizationEntity } from "./organization.entity";

export interface IOrganizationDatasource {
    createOrg(name: string, tx?: PrismaTransactionClient): Promise<OrganizationEntity>
    findManyById(ids: string[]): Promise<OrganizationEntity[]>
}