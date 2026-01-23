
export type JobType =
    | "CONTEXT_PACK"
    | "SCORECARD_GEN"
    | "AUDIT_GEN"
    | "DELIVERY"
    | "ATLASSIAN_SYNC";

export type OrderStatus = "RECEIVED" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface JobData {
    orderId: string;
    jobType: JobType;
    status: "QUEUED" | "RUNNING" | "SUCCEEDED" | "FAILED";
    attempts: number;
    maxAttempts: number;
    createdAt?: any;
    updatedAt?: any;

    // For Atlassian Sync
    syncTarget?: 'CONFLUENCE' | 'JIRA' | 'ALL';
    pageId?: string; // For Confluence
    content?: string; // For Confluence
    issueKey?: string; // For Jira
    issueData?: any; // For Jira
}
