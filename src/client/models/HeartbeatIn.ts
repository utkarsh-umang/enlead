/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type HeartbeatIn = {
    state: HeartbeatIn.state;
    detail?: (string | null);
    in_flight?: number;
};
export namespace HeartbeatIn {
    export enum state {
        WAITING = 'waiting',
        PROCESSING = 'processing',
        BLOCKED = 'blocked',
    }
}

