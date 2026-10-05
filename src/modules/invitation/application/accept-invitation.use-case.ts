import { ITransactionManager } from "../../../shared/database/transaction-manager";
import { CustomError } from "../../../shared/errors/custom-errors";
import { ErrorCode } from "../../../shared/errors/error-codes";
import { IHashService } from "../../../shared/services/hash.service";
import { MembershipEntity, MembershipStatusEnum } from "../../membership/domain/membership.entity";
import { IMembershipRepository } from "../../membership/domain/membership.repository.contract";
import { IUserRepository } from "../../user/domain/user.repository.contract";
import { InvitationEntity, InvitationStatusEnum } from "../domain/invitation.entity";
import { IInvitationRepository } from "../domain/invitation.repository.contract";


export interface IAcceptInvitationUseCase {
    execute(token: string, registrationData?: { password: string, name: string }): Promise<MembershipEntity>
}

export class AcceptInvitationUseCase implements IAcceptInvitationUseCase {

    constructor(
        private readonly invitationRepo: IInvitationRepository,
        private readonly membershipRepo: IMembershipRepository,
        private readonly userRepo: IUserRepository,
        private readonly hashService: IHashService,
        private readonly tx: ITransactionManager
    ) { }

    async execute(token: string, registrationData?: { password: string, name: string }): Promise<MembershipEntity> {
        const invitation = await this.invitationRepo.findByToken(token)

        if (!invitation) throw CustomError.notFound("Invitation not found");

        if (invitation.expiresAt < new Date(Date.now()) || invitation.status !== InvitationStatusEnum.PENDING) {
            throw CustomError.badRequest("Invalid invitation")
        }

        const existingUser = await this.userRepo.findByEmail(invitation.email)

        if (!existingUser && !registrationData) {
            throw CustomError.badRequest("Data registration needed for new users", ErrorCode.VALIDATION_ERROR)
        }

        return this.tx.run(async (tx) => {

            let userId: string
            let currentMembership: MembershipEntity

            if (!existingUser && registrationData) {
                const hashedPassword = this.hashService.hash(registrationData.password)

                const newUser = await this.userRepo.create({
                    email: invitation.email,
                    password: hashedPassword,
                    name: registrationData.name
                }, true, tx)
                userId = newUser.id
            } else {
                userId = existingUser?.id!
            }

            const oldMembership = (await this.membershipRepo.findManyByUserId(userId, MembershipStatusEnum.SUSPENDED))
                .filter(({ organizationId }) => organizationId === invitation.organizationId)
            [0];

            if (oldMembership) {
                currentMembership = await this.membershipRepo.update({
                    ...oldMembership,
                    role: invitation.role,
                    userId,
                    status: MembershipStatusEnum.ACTIVE
                }, tx)
            } else {
                currentMembership = await this.membershipRepo.create({
                    role: invitation.role,
                    userId
                }, invitation.organizationId, tx)
            }

            await this.invitationRepo.update(InvitationEntity.fromObject({
                ...invitation,
                status: InvitationStatusEnum.ACCEPTED
            }), tx)

            return currentMembership
        })

    }

}