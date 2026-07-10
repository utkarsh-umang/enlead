/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SourceDetail } from '../models/SourceDetail';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SourcesService {
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
