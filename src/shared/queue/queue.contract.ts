import { JobsOptions } from "bullmq";

export interface IQueueService<TJobs extends Record<string, unknown>> {
    enqueue<K extends keyof TJobs & string>(
        jobName: K,
        payload: TJobs[K],
        options?: JobsOptions
    ): Promise<void>
}