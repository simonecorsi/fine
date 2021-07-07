export = fine;
/**
 *
 *
 * @param {Array<() => any>} [callbacks=[]]
 * @param {FineOptions} [opts={}]
 */
declare function fine(callbacks?: Array<() => any>, opts?: FineOptions): void;
declare namespace fine {
    export { validateParameters, ProcessEvents, FineOptions };
}
type FineOptions = {
    timeout: number;
    events: ProcessEvents;
};
/**
 * @param {number} timeout
 * @param {ProcessEvents} events
 * @param {Array<() => any>} callbacks
 */
declare function validateParameters(timeout: number, events: ProcessEvents, callbacks: Array<() => any>): void;
type ProcessEvents = Array<"SIGINT" | "SIGTERM" | "uncaughtException" | "unhandledRejection">;
