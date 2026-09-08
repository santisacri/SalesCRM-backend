import { GetOrganizationMembersUseCase } from "../../modules/membership/application/get-organization-members.use-case";
import { MembershipController } from "../../modules/membership/presentation/membership.controller";
import { membershipRepository } from "./repositories.container";

const getOrganizationMembers = new GetOrganizationMembersUseCase(membershipRepository)

export const membershipController = new MembershipController({ getOrganizationMembers })