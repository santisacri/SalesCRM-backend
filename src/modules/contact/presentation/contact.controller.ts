import { NextFunction, Request, Response } from "express"
import { ContactDetailSchema, CreateContactInput } from "./contact.schemas"
import { ICreateContactUseCase } from "../application/create-contact.use-case"
import { CustomError } from "../../../shared/errors/custom-errors"
import { ErrorCode } from "../../../shared/errors/error-codes"
import { IGetContactByIdUseCase } from "../application/get-contact-by-id.use-case"

type UseCases = {
    createContact: ICreateContactUseCase,
    getContactById: IGetContactByIdUseCase
}

export class ConctactController {

    constructor(
        private readonly useCases: UseCases
    ) { }

    createContact = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = req.body as CreateContactInput

            const contact = await this.useCases.createContact.execute(input, {
                organizationId: req.user.organizationId!,
                role: req.user.role!,
                userId: req.user.entity.id
            })

            res.status(201).json({ contact })
        } catch (error) {
            next(error)
        }
    }

    getContactById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const contactId = req.params.contactId as string

            if (!contactId) throw CustomError.badRequest('Missing contactId', ErrorCode.BAD_REQUEST)

            const result = await this.useCases.getContactById.execute(contactId, req.user.organizationId!)

            const contactDetail = ContactDetailSchema.parse(result)

            res.status(201).json({ contactDetail })
        } catch (error) {
            next(error)
        }
    }
}