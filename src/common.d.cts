export type ProcessEvents = Array<"SIGINT" | "SIGTERM" | "uncaughtException" | "unhandledRejection">;
export type FineOptions = {
    timeout: number;
    events: ProcessEvents;
    unref: boolean;
    allowDuplicateHandlers: boolean;
};
/**
 * @param {number} timeout
 * @param {ProcessEvents} events
 * @param {Array<() => any>} callbacks
 */
export function validateParameters(timeout: number, events: ProcessEvents, callbacks: Array<() => any>): void;
/**
 *
 *
 * @param {Array<() => any>} [callbacks=[]]
 * @param {FineOptions} [opts={}]
 */
export function fine(callbacks?: Array<() => any>, opts?: FineOptions): void;
