import { PrismaClient } from "../../generated/prisma/client";
import { PrismaTransactionClient, ITransactionManager } from "./transaction-manager";

export class PrismaTransactionManager implements ITransactionManager {
    constructor(private readonly prisma: PrismaClient) { }

    run<T>(fn: (tx: PrismaTransactionClient) => Promise<T>): Promise<T> {
        return this.prisma.$transaction(fn);
    }
}