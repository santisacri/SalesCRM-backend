import { CreateTeamUseCase } from "../../modules/team/application/create-team.use-case";
import { DeleteTeamUseCase } from "../../modules/team/application/delete-team.use-case";
import { ListOrganizationTeamsUseCase } from "../../modules/team/application/list-organization-teams.use-case";
import { TeamController } from "../../modules/team/presentation/team.controller";
import { membershipRepository, teamRepository } from "./repositories.container";
import { transactionManager } from "./transaction-manager.container";



const createTeam = new CreateTeamUseCase(teamRepository, membershipRepository, transactionManager)
const deleteTeam = new DeleteTeamUseCase(teamRepository, membershipRepository, transactionManager)
const listOrganizationTeams = new ListOrganizationTeamsUseCase(teamRepository)

export const teamController = new TeamController({
    createTeam,
    listOrganizationTeams,
    deleteTeam
})