import { CustomError } from "../../../shared/errors/custom-errors"

interface IOrganizationEntity {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
}

export class OrganizationEntity {

    private constructor(
        public id: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date
    ) { }


    static fromObject(props: IOrganizationEntity): OrganizationEntity {
        const { id, name, createdAt, updatedAt } = props

        if (!id) throw CustomError.badRequest('[OrganizationEntity] Missing id');
        if (!name) throw CustomError.badRequest('[OrganizationEntity] Missing name');
        if (!createdAt) throw CustomError.badRequest('[OrganizationEntity] Missing createdAt');
        if (!updatedAt) throw CustomError.badRequest('[OrganizationEntity] Missing updatedAt');

        return new OrganizationEntity(id, name, createdAt, updatedAt)
    }
}