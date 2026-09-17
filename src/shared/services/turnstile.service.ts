export interface ITurnstileService {
    verify(token: string, remoteIp?: string): Promise<boolean>
}

type TurnstileVerifyResponse = {
    success: boolean
    'error-codes'?: string[]
    challenge_ts?: string
    hostname?: string
}


export class TurnstileService implements ITurnstileService {
    constructor(
        private readonly secretKey: string
    ) { }

    async verify(token: string, remoteIp?: string): Promise<boolean> {
        try {
            const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ secret: this.secretKey, response: token, remoteip: remoteIp })
            })

            const data = await response.json() as TurnstileVerifyResponse
            return data.success === true
        } catch {
            return false
        }
    }
}