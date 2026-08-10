import { CreateContactUseCase } from "../../modules/contact/application/create-contact.use-case";
import { ConctactController } from "../../modules/contact/presentation/contact.controller";
import { contactRepository } from "./repositories.container";

const createContact = new CreateContactUseCase(contactRepository)

export const conctactController = new ConctactController({ createContact })