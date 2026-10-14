import { Request, Response, NextFunction } from "express"
import { CreateNoteInput } from "./activity.schemas"
import getContext from "../../../shared/helpers/get-context"
import { ICreateNoteUseCase } from "../application/create-note.use-case"

type UseCases = {
    createNote: ICreateNoteUseCase
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
}