import { CorsOptions } from "cors";
import envs from "./envs";

export const corsConfig: CorsOptions = {
    credentials: true,
    origin: envs.FRONTEND_URL
}