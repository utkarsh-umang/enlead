/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchSummaryOut } from './BatchSummaryOut';
export type SourceDetail = {
    source: string;
    lead_count: number;
    total_rows_uploaded: number;
    total_quarantined: number;
    total_deduped: number;
    total_with_email_at_upload: number;
    currently_with_email: number;
    currently_without_email: number;
    enrichment_tried_no_email: number;
    enrichment_on_hold: number;
    enrichment_pending: number;
    batches: Array<BatchSummaryOut>;
};

