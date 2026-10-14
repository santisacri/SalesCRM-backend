const AR_OFFSET_MS = 3 * 60 * 60 * 1000

export function startOfMonthAR(now = new Date()): Date {
    const local = new Date(now.getTime() - AR_OFFSET_MS)
    return new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), 1, 3, 0, 0, 0))
}

export function daysAgo(days: number, now = new Date()): Date {
    return new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
}