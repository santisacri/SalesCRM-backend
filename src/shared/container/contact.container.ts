import { CreateContactUseCase } from "../../modules/contact/application/create-contact.use-case";
import { GetContactByIdUseCase } from "../../modules/contact/application/get-contact-by-id.use-case";
import { ConctactController } from "../../modules/contact/presentation/contact.controller";
import { activityRepository, contactRepository, dealRepository } from "./repositories.container";

const createContact = new CreateContactUseCase(contactRepository)
const getContactById = new GetContactByIdUseCase(contactRepository, dealRepository, activityRepository)

export const conctactController = new ConctactController({
    createContact,
    getContactById
})