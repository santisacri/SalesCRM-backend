import { Queue } from "bullmq";
import { redisConnection } from "../queue/redis-connection";
import { BullMQQueueService } from "../queue/bullmq-queue.service";
import { IMailQueueService, MailJobs } from "../queue/mail/mail-queue.service.contract";

export const mailQueue = new Queue("mail", { connection: redisConnection });
export const mailQueueService: IMailQueueService = new BullMQQueueService<MailJobs>(mailQueue);