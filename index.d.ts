export = fine;
/**
 * @param {Array<() => any>} [callbacks=[]]
 * @param {FineOptions} [opts={}]
 */
declare function fine(callbacks?: Array<() => any>, opts?: FineOptions): void;
declare namespace fine {
    export { DEFAULT_OPTS, validateParameters, fine, ProcessEvents, FineOptions };
}
type FineOptions = {
    timeout: number;
    events: ProcessEvents;
    unref: boolean;
    allowDuplicateHandlers: boolean;
};
declare namespace DEFAULT_OPTS {
    export const timeout: number;
    export { DEFAULT_EVENTS as events };
    export const unref: boolean;
    export const allowDuplicateHandlers: boolean;
}
/**
 * @param {Array<() => any>} [callbacks=[]]
 * @param {FineOptions} [opts={}]
 */
declare function validateParameters(callbacks?: Array<() => any>, opts?: FineOptions): void;
type ProcessEvents = Array<"SIGINT" | "SIGTERM" | "uncaughtException" | "unhandledRejection">;
/**
 * @typedef {Array<"SIGINT" | "SIGTERM" | "uncaughtException" | "unhandledRejection">} ProcessEvents
 */
declare const DEFAULT_EVENTS: string[];
