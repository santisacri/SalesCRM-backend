import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { IUserRepository } from '../../user/domain/user.repository.contract';
import { IHashService } from '../../../shared/services/hash.service';
import { RegisterUserUseCase } from './register-user.use-case';
import { TRegisterUser } from '../presentation/auth.schemas';

describe('RegisterUserUseCase', () => {
    let userRepo: IUserRepository;
    let hashService: IHashService;
    let useCase: RegisterUserUseCase;

    const validInput: TRegisterUser = {
        name: 'Santiago',
        email: 'santiago@test.com',
        password: 'Password123',
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

        useCase = new RegisterUserUseCase(userRepo, hashService);
    })

    it('should hash the password and use the hash when creating the user', async () => {
        (hashService.hash as Mock).mockReturnValue('hashed-password-123');

        await useCase.execute(validInput);

        expect(hashService.hash).toHaveBeenCalledWith(validInput.password);
        expect(hashService.hash).toHaveBeenCalledTimes(1);

        expect(userRepo.create).toHaveBeenCalledWith({
            name: validInput.name,
            email: validInput.email,
            password: 'hashed-password-123',
        });
    })

    it('should never pass the plain-text password to create', async () => {
        (hashService.hash as Mock).mockReturnValue('hashed-password-123');

        await useCase.execute(validInput);

        const createArg = (userRepo.create as Mock).mock.calls[0][0];
        expect(createArg.password).not.toBe(validInput.password);
    })

    it('should pass through all non-password fields unchanged', async () => {
        (hashService.hash as Mock).mockReturnValue('hashed-password-123');

        await useCase.execute(validInput);

        const createArg = (userRepo.create as Mock).mock.calls[0][0];
        expect(createArg.name).toBe(validInput.name);
        expect(createArg.email).toBe(validInput.email);
    })

    it('should propagate the error if userRepo.create fails', async () => {
        (hashService.hash as Mock).mockReturnValue('hashed-password-123');
        (userRepo.create as Mock).mockRejectedValue(new Error('Email already exists'));

        await expect(useCase.execute(validInput)).rejects.toThrow('Email already exists');
    })

    it('should not call create if hashing fails', async () => {
        (hashService.hash as Mock).mockImplementation(() => {
            throw new Error('Hashing failed');
        })

        await expect(useCase.execute(validInput)).rejects.toThrow('Hashing failed');
        expect(userRepo.create).not.toHaveBeenCalled();
    })
})