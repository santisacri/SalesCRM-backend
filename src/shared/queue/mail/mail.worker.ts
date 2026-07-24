import { Worker, Job } from "bullmq";
import { redisConnection } from "../redis-connection";
import { mailService } from "../../container/services.container";
import { MailJobs } from "./mail-queue.service.contract";

export const mailWorker = new Worker<MailJobs[keyof MailJobs], void, keyof MailJobs>(
    "mail",
    async (job: Job<MailJobs[keyof MailJobs], void, keyof MailJobs>) => {
        switch (job.name) {
            case "send-verify-email": {
                const { to, name, token } = job.data as MailJobs["send-verify-email"];
                await mailService.sendVerifyAccountEmail(to, token, name);
                break;
            }
            case "send-reset-password-email": {
                const { to, name, token } = job.data as MailJobs["send-reset-password-email"];
                await mailService.sendPasswordResetEmail(to, token, name);
                break;
            }
            default:
                throw new Error(`Unknown job name: ${job.name}`);
        }
    },
    { connection: redisConnection, concurrency: 5 }
);

mailWorker.on("completed", (job) => {
    console.log(`[mail-worker] Job ${job.id} (${job.name}) completed`);
});

mailWorker.on("failed", (job, err) => {
    console.error(`[mail-worker] Job ${job?.id} (${job?.name}) failed after ${job?.attemptsMade} attempts:`, err.message);
});