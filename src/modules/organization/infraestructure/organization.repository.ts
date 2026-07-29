import { PrismaTransactionClient } from "../../../shared/database/transaction-manager";
import { IOrganizationDatasource } from "../domain/organization.datasource.contract";
import { OrganizationEntity } from "../domain/organization.entity";
import { IOrganizationRepository } from "../domain/organization.repository.contract";


export class OrganizationRepository implements IOrganizationRepository {

    constructor(
        private readonly orgDatasource: IOrganizationDatasource
    ) { }

    createOrg(name: string, tx?: PrismaTransactionClient): Promise<OrganizationEntity> {
        return this.orgDatasource.createOrg(name, tx)
    }

}