import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { CustomError } from "./custom-errors";
import envs from "../config/envs";
import { ErrorCode } from "./error-codes";

export default function handlePrismaError(error: unknown, code?: ErrorCode): never {
    if (error instanceof PrismaClientKnownRequestError) {
        !envs.IN_PRODUCTION && console.log(error.message)
        switch (error.code) {
            case 'P2002': {
                if (code && code === "USER_ALREADY_ADMIN") {
                    throw CustomError.badRequest(`This user already leads a team`, ErrorCode.USER_ALREADY_ADMIN);
                }

                if (code && code === "EMAIL_ALREADY_EXISTS") {
                    throw CustomError.badRequest(`This user already leads a team`, ErrorCode.EMAIL_ALREADY_EXISTS);
                }

                throw CustomError.badRequest(`Already exist a record with that value`, ErrorCode.UNIQUE_CONSTRAINT_VIOLATION);
            }
            case 'P2025':
                throw CustomError.notFound('Record not found');
            case 'P2014':
                throw CustomError.badRequest('The operation violates a required relation');
            case 'P2011':
                throw CustomError.badRequest('Required field missing');
            default:
                throw CustomError.internal(`Database error: ${error.code}`);
        }
    }

    console.log(error)
    throw CustomError.internal('Something went wrong')
}
