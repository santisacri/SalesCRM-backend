import { CreateDealUseCase } from "../../modules/deal/application/create-deal.use-case";
import { GetDealDetail } from "../../modules/deal/application/get-deal-detail.use-case";
import { ListDealsByStageUseCase } from "../../modules/deal/application/list-deals-by-stage.use-case";
import { DealController } from "../../modules/deal/presentation/deal.controller";
import { activityRepository, dealRepository } from "./repositories.container";


const createDeal = new CreateDealUseCase(dealRepository)
const listDealsByStage = new ListDealsByStageUseCase(dealRepository)
const getDealDetail = new GetDealDetail(dealRepository, activityRepository)

export const dealController = new DealController({
    createDeal,
    listDealsByStage,
    getDealDetail
})