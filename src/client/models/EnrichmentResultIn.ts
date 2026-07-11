/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EnrichmentResultIn = {
    lead_id: string;
    type?: string;
    cost_mode: EnrichmentResultIn.cost_mode;
    status: EnrichmentResultIn.status;
    value?: (string | null);
    confidence?: (number | null);
    provider?: (string | null);
    cost_incurred?: (number | null);
};
export namespace EnrichmentResultIn {
    export enum cost_mode {
        LOW = 'low',
        HIGH = 'high',
    }
    export enum status {
        FOUND = 'found',
        NOT_FOUND = 'not_found',
        FAILED = 'failed',
    }
}

