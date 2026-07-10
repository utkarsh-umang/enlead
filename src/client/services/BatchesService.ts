/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchSummary } from '../models/BatchSummary';
import type { Body_upload_batch } from '../models/Body_upload_batch';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BatchesService {
    /**
     * Upload Batch
     * @param formData
     * @returns BatchSummary Successful Response
     * @throws ApiError
     */
    public static uploadBatch(
        formData: Body_upload_batch,
    ): CancelablePromise<BatchSummary> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/batches/upload',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
