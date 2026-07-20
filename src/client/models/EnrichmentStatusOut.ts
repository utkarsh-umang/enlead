/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Everything the dashboard panel needs to answer 'what's the finder
 * doing, and can I close my laptop?'
 */
export type EnrichmentStatusOut = {
    worker_state: (string | null);
    worker_detail: (string | null);
    worker_in_flight: number;
    worker_last_seen_at: (string | null);
    worker_alive: boolean;
    paused: boolean;
    pause_reason: (string | null);
    pending_low: number;
    pending_high: number;
    attempts_last_hour: number;
    attempts_today: number;
    found_today: number;
    attempts_total: number;
    found_total: number;
    cost_today_usd: number;
    cost_total_usd: number;
};

