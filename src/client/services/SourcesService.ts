/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReleaseResult } from '../models/ReleaseResult';
import type { SourceDetail } from '../models/SourceDetail';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SourcesService {
    /**
     * Release Enrichment Hold
     * Lift the import-time hold for this source's leads — they join the
     * email finder queue immediately (the worker is woken, not polled).
     * @param source
     * @returns ReleaseResult Successful Response
     * @throws ApiError
     */
    public static releaseEnrichmentHold(
        source: string,
    ): CancelablePromise<ReleaseResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/sources/{source}/release-enrichment',
            path: {
                'source': source,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Source Detail
     * @param source
     * @returns SourceDetail Successful Response
     * @throws ApiError
     */
    public static getSourceDetail(
        source: string,
    ): CancelablePromise<SourceDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/sources/{source}',
            path: {
                'source': source,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
