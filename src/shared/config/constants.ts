import envs from "./envs";

export const ACCESS_TOKEN_EXP = envs.IN_PRODUCTION ? 60 * 15 : 60 * 60
export const REFRESH_TOKEN_EXP = 60 * 60 * 24 * 7