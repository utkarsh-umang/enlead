/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnrichmentQueueItem } from '../models/EnrichmentQueueItem';
import type { EnrichmentResultIn } from '../models/EnrichmentResultIn';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EnrichmentService {
    /**
     * Get Enrichment Queue
     * Leads needing an email attempt at this cost tier: no email yet, and
     * never attempted at this cost_mode. A low-cost miss therefore stays in
     * the high-cost queue — that's the deliberate escalation path.
     * @param costMode
     * @param limit
     * @returns EnrichmentQueueItem Successful Response
     * @throws ApiError
     */
    public static getEnrichmentQueue(
        costMode: string = 'low',
        limit: number = 25,
    ): CancelablePromise<Array<EnrichmentQueueItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/enrichment/queue',
            query: {
                'cost_mode': costMode,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Post Enrichment Result
     * Record one attempt and, on a find, fill the lead's email — in the
     * same transaction, so the ledger and the lead can't disagree.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static postEnrichmentResult(
        requestBody: EnrichmentResultIn,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/enrichment/results',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
