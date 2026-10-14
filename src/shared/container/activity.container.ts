import { CreateNoteUseCase } from "../../modules/activity/application/create-note.use-case";
import { ListActivitiesByContactUseCase } from "../../modules/activity/application/list-activities-by-contact.use-case";
import { ActivityController } from "../../modules/activity/presentation/activity.controller";
import { activityRepository, contactRepository, dealRepository } from "./repositories.container";

const createNote = new CreateNoteUseCase(activityRepository, contactRepository, dealRepository)
const listActivitiesByContact = new ListActivitiesByContactUseCase(activityRepository, contactRepository)

export const activityController = new ActivityController({
    createNote,
    listActivitiesByContact
})