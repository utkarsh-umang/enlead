/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuarantinedRowOut } from './QuarantinedRowOut';
/**
 * Drill-down for one upload: full metadata plus every row that got
 * quarantined and why — data that was stored but invisible until now.
 */
export type BatchDetail = {
    id: string;
    source: string;
    filename: string;
    status: string;
    created_at: string;
    row_count_raw: number;
    row_count_valid: number;
    row_count_quarantined: number;
    row_count_new_leads: number;
    row_count_merged: number;
    row_count_with_email: number;
    quarantined_rows: Array<QuarantinedRowOut>;
};

