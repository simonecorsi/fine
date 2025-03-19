/**
 *
 *
 * @param {Array<() => unknown>} [callbacks=[]]
 * @param {FineOptions} [opts={}]
 * @param {typeof console.log} [logFnc=process.stdout.write] Loggin function, default to console.log, if no function log is suppressed
 */
export default function fine(
  callbacks?: Array<() => unknown>,
  opts?: FineOptions,
  logFnc?: typeof console.log,
): void;
export type ProcessEvents = Array<
  "SIGINT" | "SIGTERM" | "uncaughtException" | "unhandledRejection"
>;
export type FineOptions = {
  timeout: number;
  events: ProcessEvents;
  unref: boolean;
  allowDuplicateHandlers: boolean;
};
