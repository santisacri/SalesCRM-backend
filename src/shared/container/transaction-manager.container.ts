import { PrismaTransactionManager } from "../database/prisma-transaction-manager";
import { prisma } from "../lib/prisma";


export const transactionManager = new PrismaTransactionManager(prisma)