import { PrismaClient } from "../../generated/prisma/client";

export type PrismaTransactionClient = Omit<
    PrismaClient,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>

export interface ITransactionManager {
    run<T>(fn: (tx: PrismaTransactionClient) => Promise<T>): Promise<T>;
}