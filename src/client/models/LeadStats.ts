/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SourceCount } from './SourceCount';
export type LeadStats = {
    total: number;
    with_email: number;
    without_email: number;
    contactable_never_contacted: number;
    by_source: Array<SourceCount>;
};

