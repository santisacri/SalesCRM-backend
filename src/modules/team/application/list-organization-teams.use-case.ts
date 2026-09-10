import { UserEntity } from "../../user/domain/user.entity";
import { TeamEntity } from "../domain/team.entity";
import { ITeamRepository } from "../domain/team.repository.contract";

export interface IListOrganizationTeamsUseCase {
    execute(organizationId: string): Promise<{ team: TeamEntity, admin: UserEntity }[]>
}

export class ListOrganizationTeamsUseCase implements IListOrganizationTeamsUseCase {

    constructor(
        private readonly teamRepo: ITeamRepository
    ) { }

    async execute(organizationId: string): Promise<{ team: TeamEntity; admin: UserEntity; }[]> {
        return this.teamRepo.listByOrgWithAdmin(organizationId)
    }

}