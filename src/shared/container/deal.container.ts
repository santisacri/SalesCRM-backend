import { CreateDealUseCase } from "../../modules/deal/application/create-deal.use-case";
import { GetDealDetail } from "../../modules/deal/application/get-deal-detail.use-case";
import { ListDealsByStageUseCase } from "../../modules/deal/application/list-deals-by-stage.use-case";
import { UpdateDealUseCase } from "../../modules/deal/application/update-deal.use-case";
import { DealController } from "../../modules/deal/presentation/deal.controller";
import { activityRepository, contactRepository, dealRepository, membershipRepository } from "./repositories.container";


const createDeal = new CreateDealUseCase(dealRepository)
const listDealsByStage = new ListDealsByStageUseCase(dealRepository)
const getDealDetail = new GetDealDetail(dealRepository, activityRepository)
const updateDeal = new UpdateDealUseCase(dealRepository, membershipRepository, contactRepository)

export const dealController = new DealController({
    createDeal,
    listDealsByStage,
    getDealDetail,
    updateDeal
})