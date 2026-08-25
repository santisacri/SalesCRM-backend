import { CreateTeamUseCase } from "../../modules/team/application/create-team.use-case";
import { TeamController } from "../../modules/team/presentation/team.controller";
import { membershipRepository, teamRepository } from "./repositories.container";



const createTeam = new CreateTeamUseCase(teamRepository, membershipRepository)

export const teamController = new TeamController({
    createTeam
})