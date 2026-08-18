import { NextFunction, Request, Response } from "express"
import { contactDetailSchema, ContactInput, CreateContactInput } from "./contact.schemas"
import { ICreateContactUseCase } from "../application/create-contact.use-case"
import { CustomError } from "../../../shared/errors/custom-errors"
import { ErrorCode } from "../../../shared/errors/error-codes"
import { IGetContactByIdUseCase } from "../application/get-contact-by-id.use-case"
import getContext from "../../../shared/helpers/get-context"
import { IUpdateContactUseCase } from "../application/update-contact.use-case"
import { IDeleteContactUseCase } from "../application/delete-contact.use-case"
import { IListContactsByOrgUseCase } from "../application/list-contacts-by-org.use-case"

type UseCases = {
    createContact: ICreateContactUseCase,
    getContactById: IGetContactByIdUseCase,
    updateContact: IUpdateContactUseCase,
    deleteContact: IDeleteContactUseCase,
    listContactsByOrg: IListContactsByOrgUseCase
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

            const contactDetail = contactDetailSchema.parse(result)

            res.status(201).json({ contactDetail })
        } catch (error) {
            next(error)
        }
    }

    updateContact = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = req.body as ContactInput
            const contactId = req.params.contactId as string
            const ctx = getContext(req)

            const updatedContact = await this.useCases.updateContact.execute(input, contactId, ctx)

            res.status(200).json({ updatedContact })
        } catch (error) {
            next(error)
        }
    }

    deleteContact = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const contactId = req.params.contactId as string
            const ctx = getContext(req)

            await this.useCases.deleteContact.execute(contactId, ctx)

            res.status(200).json({ message: 'Contact deleted successfully' })
        } catch (error) {
            next(error)
        }
    }

    listContactsByOrg = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ctx = getContext(req)

            const contacts = await this.useCases.listContactsByOrg.execute(ctx.organizationId)

            res.status(200).json({ contacts })
        } catch (error) {
            next(error)
        }
    }
}