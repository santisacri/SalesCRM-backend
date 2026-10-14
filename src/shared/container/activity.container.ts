import { CreateNoteUseCase } from "../../modules/activity/application/create-note.use-case";
import { ActivityController } from "../../modules/activity/presentation/activity.controller";
import { activityRepository, contactRepository, dealRepository } from "./repositories.container";

const createNote = new CreateNoteUseCase(activityRepository, contactRepository, dealRepository)

export const activityController = new ActivityController({
    createNote
})