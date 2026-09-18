import { AssignMemberToTeamUseCase } from "../../modules/membership/application/assign-member-to-team.use-case";
import { ChangeAdminUseCase } from "../../modules/membership/application/change-admin.use-case";
import { GetOrganizationMembersUseCase } from "../../modules/membership/application/get-organization-members.use-case";
import { KickMemberUseCase } from "../../modules/membership/application/kick-member.use-case";
import { MembershipController } from "../../modules/membership/presentation/membership.controller";
import { membershipRepository, refreshTokenRepository, teamRepository } from "./repositories.container";
import { transactionManager } from "./transaction-manager.container";

const getOrganizationMembers = new GetOrganizationMembersUseCase(membershipRepository)
const kickMember = new KickMemberUseCase(membershipRepository, teamRepository, refreshTokenRepository)
const assignMemberToTeam = new AssignMemberToTeamUseCase(membershipRepository, teamRepository)
const changeAdmin = new ChangeAdminUseCase(membershipRepository, teamRepository, transactionManager)

export const membershipController = new MembershipController({
    getOrganizationMembers,
    kickMember,
    assignMemberToTeam,
    changeAdmin
})