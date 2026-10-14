import { GetDashboardSummaryUseCase } from "../../modules/dashboard/application/get-dashboard-summary.use-case";
import { DashboardController } from "../../modules/dashboard/presentation/dashboard.controller";
import { contactRepository, dealRepository } from "./repositories.container";

const getSummary = new GetDashboardSummaryUseCase(dealRepository, contactRepository)

export const dashboardController = new DashboardController({
    getSummary
})