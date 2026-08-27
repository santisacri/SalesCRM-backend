import { TokenType } from "../../modules/token/domain/token.entity";
import envs from "./envs";

export const ACCESS_TOKEN_EXP = envs.IN_PRODUCTION ? 60 * 15 : 60 * 60
export const REFRESH_TOKEN_EXP = 60 * 60 * 24 * 7
export const INVITATION_EXPIRATION_MS = 1000 * 60 * 60 * 24 * 5

export const TOKEN_EXPIRATION_MS: Record<TokenType, number> = {
    [TokenType.EMAIL_VERIFICATION]: 24 * 60 * 60 * 1000,
    [TokenType.PASSWORD_RESET]: 60 * 60 * 1000
};