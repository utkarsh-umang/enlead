/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MappingFunctionOut } from '../models/MappingFunctionOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MappingFunctionsService {
    /**
     * List Mapping Functions
     * @returns MappingFunctionOut Successful Response
     * @throws ApiError
     */
    public static listMappingFunctions(): CancelablePromise<Array<MappingFunctionOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/mapping-functions',
        });
    }
}
