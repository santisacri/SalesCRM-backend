import { CreateOrganizationUseCase } from "../../modules/organization/application/create-organization.use-case";
import { GetUserOrganizationsUseCase } from "../../modules/organization/application/get-user-organizations.use-case";
import { OrganizationController } from "../../modules/organization/presentation/organization.controller";
import { membershipRepository, organizationRepository } from "./repositories.container";
import { transactionManager } from "./transaction-manager.container";

const createOrg = new CreateOrganizationUseCase(organizationRepository, membershipRepository, transactionManager)
const getUserOrganizations = new GetUserOrganizationsUseCase(organizationRepository, membershipRepository)

export const organizationController = new OrganizationController({
    createOrg,
    getUserOrganizations
})