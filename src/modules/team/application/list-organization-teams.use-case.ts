import { ITeamSummary } from "../domain/team.datasource.contract";
import { ITeamRepository } from "../domain/team.repository.contract";

export interface IListOrganizationTeamsUseCase {
    execute(organizationId: string): Promise<ITeamSummary[]>
}

export class ListOrganizationTeamsUseCase implements IListOrganizationTeamsUseCase {

    constructor(
        private readonly teamRepo: ITeamRepository
    ) { }

    async execute(organizationId: string): Promise<ITeamSummary[]> {
        return this.teamRepo.listByOrgWithSummary(organizationId)
    }

}