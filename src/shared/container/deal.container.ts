import { CreateDealUseCase } from "../../modules/deal/application/create-deal.use-case";
import { DealController } from "../../modules/deal/presentation/deal.controller";
import { dealRepository } from "./repositories.container";


const createDeal = new CreateDealUseCase(dealRepository)

export const dealController = new DealController({
    createDeal
})