import { NextFunction, Request, Response } from "express"
import { CreateContactInput } from "./contact.schemas"
import { ICreateContactUseCase } from "../application/create-contact.use-case"

type UseCases = {
    createContact: ICreateContactUseCase
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
}