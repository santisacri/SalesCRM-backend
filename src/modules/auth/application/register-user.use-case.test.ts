import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { IUserRepository } from '../../user/domain/user.repository.contract';
import { IHashService } from '../../../shared/services/hash.service';
import { RegisterUserUseCase } from './register-user.use-case';
import { TRegisterUser } from '../presentation/auth.schemas';
import { ITokenRepository } from '../../token/domain/token.repository.contract';
import { UserEntity } from '../../user/domain/user.entity';
import { IMailQueueService } from '../../../shared/queue/mail/mail-queue.service.contract';

describe('RegisterUserUseCase', () => {
    let userRepo: IUserRepository;
    let tokenRepo: ITokenRepository
    let hashService: IHashService;
    let mailQueueService: IMailQueueService
    let useCase: RegisterUserUseCase;

    const validInput: TRegisterUser = {
        name: 'John Doe',
        email: 'test@x.com',
        password: 'Password123',
    }

    const storedUser: UserEntity = {
        id: 'id123',
        name: 'John Doe',
        password: 'Password123',
        email: 'test@x.com',
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    beforeEach(() => {
        userRepo = {
            create: vi.fn(),
            findByEmail: vi.fn(),
            getById: vi.fn(),
            save: vi.fn()
        }

        hashService = {
            hash: vi.fn(),
            compare: vi.fn()
        }

        mailQueueService = {
            enqueue: vi.fn()
        }

        tokenRepo = {
            createToken: vi.fn(),
            findValidBytokenAndType: vi.fn(),
            invalidateAllByUserAndType: vi.fn(),
            markAsUsed: vi.fn()
        }

        useCase = new RegisterUserUseCase(userRepo, tokenRepo, hashService, mailQueueService);
    })

    it('should hash the password, use the hash when creating the user and enqueue the mail sending', async () => {
        (hashService.hash as Mock).mockReturnValue('hashed-password-123');
        (userRepo.create as Mock).mockResolvedValue(storedUser);
        (tokenRepo.createToken as Mock).mockResolvedValue({ rawToken: 'raw-token-123' });

        await useCase.execute(validInput);

        expect(hashService.hash).toHaveBeenCalledWith(validInput.password);

        expect(mailQueueService.enqueue).toHaveBeenCalledExactlyOnceWith('send-verify-email', {
            to: storedUser.email,
            name: storedUser.name,
            token: 'raw-token-123'
        });

        expect(hashService.hash).toHaveBeenCalledTimes(1);

        expect(userRepo.create).toHaveBeenCalledWith({
            name: validInput.name,
            email: validInput.email,
            password: 'hashed-password-123',
        });
    })

    it('should never pass the plain-text password to create', async () => {
        (hashService.hash as Mock).mockReturnValue('hashed-password-123');
        (userRepo.create as Mock).mockResolvedValue(storedUser);
        (tokenRepo.createToken as Mock).mockResolvedValue({ rawToken: 'raw-token-123' });


        await useCase.execute(validInput);

        const createArg = (userRepo.create as Mock).mock.calls[0][0];
        expect(createArg.password).not.toBe(validInput.password);
    })

    it('should pass through all non-password fields unchanged', async () => {
        (hashService.hash as Mock).mockReturnValue('hashed-password-123');
        (userRepo.create as Mock).mockResolvedValue(storedUser);
        (tokenRepo.createToken as Mock).mockResolvedValue({ rawToken: 'raw-token-123' });


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