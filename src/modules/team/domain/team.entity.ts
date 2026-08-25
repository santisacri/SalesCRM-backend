import { CustomError } from "../../../shared/errors/custom-errors"

interface ITeamEntity {
    id: string
    organizationId: string
    adminId: string
    name: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}

export class TeamEntity {

    private constructor(
        public id: string,
        public organizationId: string,
        public adminId: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ) { }


    static fromObject(props: ITeamEntity): TeamEntity {
        const { id, organizationId, adminId, name, createdAt, updatedAt, deletedAt } = props

        if (!id) throw CustomError.badRequest('[TeamEntity] Missing id');
        if (!organizationId) throw CustomError.badRequest('[TeamEntity] Missing organizationId');
        if (!adminId) throw CustomError.badRequest('[TeamEntity] Missing adminId');
        if (!name) throw CustomError.badRequest('[TeamEntity] Missing name');
        if (!createdAt) throw CustomError.badRequest('[TeamEntity] Missing createdAt');
        if (!updatedAt) throw CustomError.badRequest('[TeamEntity] Missing updatedAt');

        return new TeamEntity(id, organizationId, adminId, name, createdAt, updatedAt, deletedAt)
    }
}