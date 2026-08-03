
export class CustomError extends Error {

    private constructor(
        public readonly message: string,
        public readonly statusCode: number,
        public readonly code: string
    ) { super(message) }

    static badRequest(message = "Bad Request", code = "BAD_REQUEST") {
        return new CustomError(message, 400, code)
    }

    static unauthorized(message = "Unauthorized", code = "UNAUTHORIZED") {
        return new CustomError(message, 401, code)
    }

    static forbidden(message = "Forbidden", code = "FORBIDDEN") {
        return new CustomError(message, 403, code)
    }

    static notFound(message = "Not Found", code = "NOT_FOUND") {
        return new CustomError(message, 404, code)
    }

    static internal(message = "Internal Server Error", code = "INTERNAL_ERROR") {
        return new CustomError(message, 500, code)
    }

}
