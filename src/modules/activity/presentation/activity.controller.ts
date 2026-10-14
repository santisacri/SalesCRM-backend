import { Request, Response, NextFunction } from "express"
import { CreateNoteInput, listActivitiesQuerySchema } from "./activity.schemas"
import getContext from "../../../shared/helpers/get-context"
import { ICreateNoteUseCase } from "../application/create-note.use-case"
import { IListActivitiesByContactUseCase } from "../application/list-activities-by-contact.use-case"

type UseCases = {
    createNote: ICreateNoteUseCase
    listActivitiesByContact: IListActivitiesByContactUseCase
}

export class ActivityController {

    constructor(
        private readonly useCases: UseCases
    ) { }


    createNote = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = req.body as CreateNoteInput
            const context = getContext(req)

            const activity = await this.useCases.createNote.execute(input, context)

            res.status(201).json({ activity })
        } catch (error) {
            next(error)
        }
    }

    listActivitiesByContact = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const queryParams = listActivitiesQuerySchema.parse(req.query)
            const contactId = req.params.contactId as string
            const context = getContext(req)

            const activityPage = await this.useCases.listActivitiesByContact.execute(contactId, context, queryParams)

            res.json({ activityPage })
        } catch (error) {
            next(error)
        }
    }
}