import crypto from 'crypto'

export class TokenUtil {
    static generateToken(): string {
        return crypto.randomBytes(64).toString('hex')
    }

    static hash(token: string): string {
        return crypto.createHash('sha256').update(token).digest('hex')
    }
}