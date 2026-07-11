/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExportCreateIn } from '../models/ExportCreateIn';
import type { ExportPreviewOut } from '../models/ExportPreviewOut';
import type { ExportSelection } from '../models/ExportSelection';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExportsService {
    /**
     * Preview Export
     * @param requestBody
     * @returns ExportPreviewOut Successful Response
     * @throws ApiError
     */
    public static previewExport(
        requestBody: ExportSelection,
    ): CancelablePromise<ExportPreviewOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/exports/preview',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Export
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createExport(
        requestBody: ExportCreateIn,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/exports',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
