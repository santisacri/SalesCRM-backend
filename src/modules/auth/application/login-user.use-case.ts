import { ACCESS_TOKEN_EXP } from "../../../shared/config/constants";
import { CustomError } from "../../../shared/errors/custom-errors";
import { IHashService } from "../../../shared/services/hash.service";
import { IJWTService } from "../../../shared/services/jwt.service";
import { IUserEntity, UserEntity } from "../../user/domain/user.entity";
import { IUserRepository } from "../../user/domain/user.repository.contract";
import { IRefreshTokenRepository } from "../domain/refresh-token.repository.contract";
import { TLoginUser } from "../presentation/auth.schemas";

export interface ILoginUserUseCase {
    execute(credentials: TLoginUser): Promise<{
        user: Omit<IUserEntity, "password">,
        accessToken: string,
        refreshToken: string
    }>
}

export class LoginUserUseCase implements ILoginUserUseCase {


    constructor(
        private readonly userRepo: IUserRepository,
        private readonly refreshTokenRepo: IRefreshTokenRepository,
        private readonly hashService: IHashService,
        private readonly jwtService: IJWTService
    ) { }

    async execute(credentials: TLoginUser): Promise<{ user: Omit<IUserEntity, "password">; accessToken: string; refreshToken: string }> {
        const user = await this.userRepo.findByEmail(credentials.email)

        if (!user) throw CustomError.badRequest('Invalid credentials');
        if (!user.emailVerified) throw CustomError.forbidden('Please verify your email before logging in');

        const isValidPassword = this.hashService.compare(credentials.password, user.password)

        if (!isValidPassword) throw CustomError.badRequest('Invalid credentials');

        const accessToken = this.jwtService.sign(user.id, ACCESS_TOKEN_EXP)

        const { rawRefreshToken } = await this.refreshTokenRepo.create(user.id)

        return {
            user: UserEntity.toDto(user),
            accessToken,
            refreshToken: rawRefreshToken
        }
    }

}