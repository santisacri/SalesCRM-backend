import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { IUserRepository } from "../../user/domain/user.repository.contract";
import { IHashService } from "../../../shared/services/hash.service";
import { ResetPasswordUseCase } from "./reset-password.use-case";
import { UserEntity } from "../../user/domain/user.entity";

describe('ResetPasswordUseCase', () => {
    let userRepo: IUserRepository
    let hashService: IHashService
    let useCase: ResetPasswordUseCase

    const rawValidPassword = 'NewValidPass123'
    const rawValidToken = 'valid-reset-token'
    const storedUser: UserEntity = {
        id: 'id123',
        name: 'John Doe',
        password: 'Password123',
        email: 'test@x.com',
        passwordResetToken: 'hashed-reset-token',
        createdAt: new Date(),
        passwordResetExpires: new Date(Date.now() + 1000 * 60 * 60),
        updatedAt: new Date()
    }

    beforeEach(() => {
        userRepo = {
            create: vi.fn(),
            findByEmail: vi.fn(),
            findByPasswordResetToken: vi.fn(),
            getById: vi.fn(),
            setPasswordResetToken: vi.fn(),
            save: vi.fn(),
        }

        hashService = {
            hash: vi.fn(),
            compare: vi.fn()
        }

        useCase = new ResetPasswordUseCase(userRepo, hashService);
    });

    it('Should reset the hashed password', async () => {
        (userRepo.findByPasswordResetToken as Mock).mockResolvedValue(storedUser);
        (hashService.hash as Mock).mockReturnValue('hashed-pass-123');

        await useCase.execute(rawValidPassword, rawValidToken);

        expect(userRepo.findByPasswordResetToken).not.toHaveBeenCalledWith(rawValidToken);

        expect(hashService.hash).toHaveBeenCalledExactlyOnceWith(rawValidPassword);

        expect(userRepo.save).toHaveBeenCalledWith({
            ...storedUser,
            password: 'hashed-pass-123',
            passwordResetExpires: null,
            passwordResetToken: null
        });
    })

    it('should throw if the token does not match any user or is expired', async () => {
        (userRepo.findByPasswordResetToken as Mock).mockResolvedValue(null);

        await expect(useCase.execute(rawValidPassword, 'invalid-token')).rejects.toThrow();
        expect(userRepo.save).not.toHaveBeenCalled();
    })

    it('should throw if the token is expired', async () => {
        const expiredUser = { ...storedUser, passwordResetExpires: new Date(Date.now() - 1000) };
        (userRepo.findByPasswordResetToken as Mock).mockResolvedValue(expiredUser);

        await expect(useCase.execute(rawValidPassword, rawValidToken)).rejects.toThrow();
        expect(userRepo.save).not.toHaveBeenCalled();
    })
})