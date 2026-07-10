/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * One batch/CSV that contributed to a lead — the CSV filename is what
 * actually distinguishes uploads within the same source, since a source
 * label like "youtube-tool" can have many uploads over time.
 */
export type SourceFileOut = {
    source: string;
    filename: string;
    uploaded_at: string;
};

