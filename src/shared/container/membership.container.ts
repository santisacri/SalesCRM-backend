import { AssignMemberToTeamUseCase } from "../../modules/membership/application/assign-member-to-team.use-case";
import { GetOrganizationMembersUseCase } from "../../modules/membership/application/get-organization-members.use-case";
import { KickMemberUseCase } from "../../modules/membership/application/kick-member.use-case";
import { MembershipController } from "../../modules/membership/presentation/membership.controller";
import { membershipRepository, refreshTokenRepository, teamRepository } from "./repositories.container";

const getOrganizationMembers = new GetOrganizationMembersUseCase(membershipRepository)
const kickMember = new KickMemberUseCase(membershipRepository, teamRepository, refreshTokenRepository)
const assignMemberToTeam = new AssignMemberToTeamUseCase(membershipRepository, teamRepository)

export const membershipController = new MembershipController({ getOrganizationMembers, kickMember, assignMemberToTeam })