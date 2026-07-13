import jwt from "jsonwebtoken"
import { CustomError } from "../errors/custom-errors"
import z from "zod"
import envs from "../config/envs"

const jwtPayloadSchema = z.object({
    sub: z.uuid({ version: "v7" }),
    iat: z.number(),
    exp: z.number(),
    aud: z.string(),
    iss: z.string(),
})

type JwtPayload = z.infer<typeof jwtPayloadSchema>

export interface IJWTService {
    sign(sub: string, exp: number): string
    verify(token: string): JwtPayload
}

export class JWTService implements IJWTService {
    /**
     * @param exp - expiration time in seconds (e.g. 900 for 15m, 604800 for 7d)
     */
    sign(sub: string, exp: number): string {
        return jwt.sign({ sub }, envs.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: exp,
            audience: 'CRMSales Frontend',
            issuer: 'CRMSales Backend'
        })
    }

    verify(token: string): JwtPayload {
        try {
            const decoded = jwt.verify(token, envs.JWT_SECRET, {
                algorithms: ['HS256'],
                audience: 'CRMSales Frontend',
                issuer: 'CRMSales Backend'
            })

            const result = jwtPayloadSchema.safeParse(decoded)

            if (!result.success) throw CustomError.unauthorized('Invalid token payload')

            return result.data
        } catch (error) {

            if (error instanceof jwt.TokenExpiredError) {
                throw CustomError.unauthorized('Expired token')
            }

            if (error instanceof jwt.JsonWebTokenError) {
                throw CustomError.unauthorized('Invalid token')
            }

            throw error
        }
    }

}

