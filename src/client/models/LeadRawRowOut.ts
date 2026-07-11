/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * One original CSV row that contributed to a lead — the untouched
 * source values, before any mapping/normalization.
 */
export type LeadRawRowOut = {
    source: string;
    filename: string;
    uploaded_at: string;
    row_index: number;
    raw_data: Record<string, any>;
};

