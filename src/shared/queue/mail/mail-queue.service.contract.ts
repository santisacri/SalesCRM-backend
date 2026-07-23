import { IQueueService } from "../queue.contract";

export type MailJobs = {
    "send-verify-email": { to: string; name: string; token: string };
    "send-reset-password-email": { to: string; name: string; token: string };
};

export type IMailQueueService = IQueueService<MailJobs>;