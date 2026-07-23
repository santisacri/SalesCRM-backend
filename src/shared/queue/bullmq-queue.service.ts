import { Queue, JobsOptions } from "bullmq";
import { IQueueService } from "./queue.contract";

export class BullMQQueueService<TJobs extends Record<string, unknown>> implements IQueueService<TJobs> {
    constructor(private readonly queue: Queue) { }

    async enqueue<K extends keyof TJobs & string>(
        jobName: K,
        payload: TJobs[K],
        options?: JobsOptions
    ): Promise<void> {
        await this.queue.add(jobName, payload, options);
    }
}