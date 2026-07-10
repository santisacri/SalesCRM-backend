import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client"

export class CustomError extends Error {

    private constructor(
        public readonly message: string,
        public readonly statusCode: number
    ) { super(message) }


    static badRequest(message = "Bad Request") {
        return new CustomError(message, 400)
    }

    static unauthorized(message = "Unauthorized") {
        return new CustomError(message, 401)
    }

    static forbidden(message = "Forbidden") {
        return new CustomError(message, 403)
    }

    static notFound(message = "Not Found") {
        return new CustomError(message, 404)
    }

    static internal(message = "Internal Server Error") {
        return new CustomError(message, 500)
    }

    static handlePrismaError(error: unknown) {
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

        throw CustomError.internal('Something went wrong')
    }
}
