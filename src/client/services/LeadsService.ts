/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeadPage } from '../models/LeadPage';
import type { LeadStats } from '../models/LeadStats';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LeadsService {
    /**
     * Get Lead Stats
     * @returns LeadStats Successful Response
     * @throws ApiError
     */
    public static getLeadStats(): CancelablePromise<LeadStats> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/leads/stats',
        });
    }
    /**
     * List Leads
     * @param page
     * @param pageSize
     * @param search
     * @returns LeadPage Successful Response
     * @throws ApiError
     */
    public static listLeads(
        page: number = 1,
        pageSize: number = 25,
        search?: (string | null),
    ): CancelablePromise<LeadPage> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/leads',
            query: {
                'page': page,
                'page_size': pageSize,
                'search': search,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
