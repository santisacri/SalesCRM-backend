import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { IUserRepository } from "../../user/domain/user.repository.contract";
import { IHashService } from "../../../shared/services/hash.service";
import { ResetPasswordUseCase } from "./reset-password.use-case";
import { UserEntity } from "../../user/domain/user.entity";
import { ITokenRepository } from "../../token/domain/token.repository.contract";
import { TokenType } from "../../token/domain/token.entity";

describe('ResetPasswordUseCase', () => {
    let userRepo: IUserRepository
    let tokenRepo: ITokenRepository
    let hashService: IHashService
    let useCase: ResetPasswordUseCase

    const rawValidPassword = 'NewValidPass123'
    const rawValidToken = 'valid-reset-token'
    const storedUser: UserEntity = {
        id: 'id123',
        name: 'John Doe',
        password: 'Password123',
        email: 'test@x.com',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const storedToken = {
        id: 'token-id-123',
        userId: storedUser.id,
        type: TokenType.PASSWORD_RESET,
        tokenHash: 'hashed-token-123',
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        usedAt: null,
        createdAt: new Date(),
    };

    beforeEach(() => {
        userRepo = {
            create: vi.fn(),
            findByEmail: vi.fn(),
            getById: vi.fn(),
            save: vi.fn(),
        }

        hashService = {
            hash: vi.fn(),
            compare: vi.fn()
        }

        tokenRepo = {
            createToken: vi.fn(),
            findValidBytokenAndType: vi.fn(),
            invalidateAllByUserAndType: vi.fn(),
            markAsUsed: vi.fn()
        }

        useCase = new ResetPasswordUseCase(userRepo, tokenRepo, hashService);
    });

    it('Should reset the hashed password', async () => {
        (tokenRepo.findValidBytokenAndType as Mock).mockResolvedValue(storedToken);
        (userRepo.getById as Mock).mockResolvedValue(storedUser);
        (hashService.hash as Mock).mockReturnValue('hashed-pass-123');

        await useCase.execute(rawValidPassword, rawValidToken);

        expect(tokenRepo.findValidBytokenAndType).toHaveBeenCalledExactlyOnceWith(rawValidToken, TokenType.PASSWORD_RESET);
        expect(userRepo.getById).toHaveBeenCalledExactlyOnceWith(storedToken.userId);
        expect(hashService.hash).toHaveBeenCalledExactlyOnceWith(rawValidPassword);

        expect(userRepo.save).toHaveBeenCalledWith({
            ...storedUser,
            password: 'hashed-pass-123',
        });

        expect(tokenRepo.markAsUsed).toHaveBeenCalledExactlyOnceWith(storedToken.id);
    })

    it('should throw if the token does not match any valid token or is expired', async () => {
        (tokenRepo.findValidBytokenAndType as Mock).mockResolvedValue(null);

        await expect(useCase.execute(rawValidPassword, 'invalid-token')).rejects.toThrow();
        expect(userRepo.save).not.toHaveBeenCalled();
        expect(tokenRepo.markAsUsed).not.toHaveBeenCalled();
    })

    it('should throw if the user associated with the token no longer exists', async () => {
        (tokenRepo.findValidBytokenAndType as Mock).mockResolvedValue(storedToken);
        (userRepo.getById as Mock).mockResolvedValue(null);

        await expect(useCase.execute(rawValidPassword, rawValidToken)).rejects.toThrow();
        expect(userRepo.save).not.toHaveBeenCalled();
        expect(tokenRepo.markAsUsed).not.toHaveBeenCalled();
    })
})