import jwt from "jsonwebtoken"
import { CustomError } from "../errors/custom-errors"
import z from "zod"
import envs from "../config/envs"
import { MembershipRoleEnum } from "../../modules/membership/domain/membership.entity"

const jwtPayloadSchema = z.object({
    sub: z.uuid({ version: "v7" }),
    organizationId: z.uuid({ version: "v7" }).optional(),
    role: z.enum(MembershipRoleEnum).optional(),
    iat: z.number(),
    exp: z.number(),
    aud: z.string(),
    iss: z.string(),
})

export type TJwtPayload = z.infer<typeof jwtPayloadSchema>

type JwtSignPayload = {
    sub: string,
    organizationId?: string,
    role?: MembershipRoleEnum,
}

export interface IJWTService {
    sign(payload: JwtSignPayload, exp: number): string
    verify(token: string): TJwtPayload
}

export class JWTService implements IJWTService {
    /**
     * @param exp - expiration time in seconds (e.g. 900 for 15m, 604800 for 7d)
     */
    sign(payload: JwtSignPayload, exp: number): string {
        return jwt.sign(payload, envs.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: exp,
            audience: 'CRMSales Frontend',
            issuer: 'CRMSales Backend'
        })
    }

    verify(token: string): TJwtPayload {
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

