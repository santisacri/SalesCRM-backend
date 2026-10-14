import { CustomError } from "../../../shared/errors/custom-errors";
import { OrgScopedCtx } from "../../../shared/types/context.types";
import { IContactRepository } from "../../contact/domain/contact.repository.contract";
import { MembershipRoleEnum } from "../../membership/domain/membership.entity";
import { ActivityPage } from "../domain/activity.datasource.contract";
import { IActivityRepository } from "../domain/activity.repository.contract";
import { ListActivitiesQuery } from "../presentation/activity.schemas";

export interface IListActivitiesByContactUseCase {
    execute(contactId: string, ctx: OrgScopedCtx, { limit, cursor, from, to }: ListActivitiesQuery): Promise<ActivityPage>
}

export class ListActivitiesByContactUseCase implements IListActivitiesByContactUseCase {

    constructor(
        private readonly activityRepo: IActivityRepository,
        private readonly contactRepo: IContactRepository
    ) { }

    async execute(contactId: string, ctx: OrgScopedCtx, { limit, cursor, from, to }: ListActivitiesQuery): Promise<ActivityPage> {
        const contact = await this.contactRepo.findById(contactId, ctx.organizationId)

        if (!contact) throw CustomError.notFound('Contact not found');

        const teamScope = ctx.role === MembershipRoleEnum.OWNER ? null : ctx.teamId

        return this.activityRepo.listByContactId(contact.id, ctx.organizationId, teamScope, { limit, cursor, from, to })
    }

}