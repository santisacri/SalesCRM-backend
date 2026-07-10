
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

}
