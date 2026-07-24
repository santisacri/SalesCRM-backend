import { Queue } from "bullmq";
import { redisConnection } from "../queue/redis-connection";
import { BullMQQueueService } from "../queue/bullmq-queue.service";
import { IMailQueueService, MailJobs } from "../queue/mail/mail-queue.service.contract";

export const mailQueue = new Queue("mail", {
    connection: redisConnection,
    defaultJobOptions: {
        attempts: 3,
        backoff: { type: "exponential", delay: 2000 },
        removeOnComplete: { count: 100 },
        removeOnFail: { count: 500 },
    },
});
export const mailQueueService: IMailQueueService = new BullMQQueueService<MailJobs>(mailQueue);