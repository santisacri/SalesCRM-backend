import * as bcrypt from 'bcrypt'

export interface IHashService {
    hash(toHash: string): string
    compare(toCompare: string, hash: string): boolean
}

const ROUNDS = 10

export class HashService implements IHashService {

    hash(toHash: string): string {
        const salt = bcrypt.genSaltSync(ROUNDS)
        return bcrypt.hashSync(toHash, salt)
    }

    compare(toCompare: string, hash: string): boolean {
        return bcrypt.compareSync(toCompare, hash)
    }

}