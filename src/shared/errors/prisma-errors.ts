import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { CustomError } from "./custom-errors";

export default function handlePrismaError(error: unknown): never {
    if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002': {
                throw CustomError.badRequest(`Already exist a record with that value`);
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
