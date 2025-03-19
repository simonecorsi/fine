import { types } from "node:util";

const { isAsyncFunction } = types;
const NOOP = () => undefined;

/**
 * @typedef {Array<"SIGINT" | "SIGTERM" | "uncaughtException" | "unhandledRejection">} ProcessEvents
 */
const DEFAULT_EVENTS = [
  "SIGINT",
  "SIGTERM",
  "uncaughtException",
  "unhandledRejection",
];

/**
 * @typedef {object} FineOptions
 * @prop {number} timeout
 * @prop {ProcessEvents} events
 * @prop {boolean} unref
 * @prop {boolean} allowDuplicateHandlers
 */
const DEFAULT_OPTS = {
  timeout: 2000,
  events: DEFAULT_EVENTS,
  unref: false,
  allowDuplicateHandlers: true,
};

/**
 * @param {number} timeout
 * @param {ProcessEvents} events
 * @param {Array<() => unknown>} callbacks
 */
function validateParameters(timeout, events, callbacks) {
  if (typeof timeout !== "number") {
    throw new TypeError("timeout parameter must be number");
  }
  if (!Array.isArray(events)) {
    throw new TypeError("events parameter must be an array of strings");
  }

  if (!Array.isArray(callbacks)) {
    throw new TypeError("callbacks parameter must be an array of functions");
  }

  callbacks.map((cb) => {
    if (typeof cb !== "function") {
      throw new TypeError("callback must be a function");
    }
  });
}

/**
 *
 *
 * @param {Array<() => unknown>} [callbacks=[]]
 * @param {FineOptions} [opts={}]
 * @param {typeof console.log} [logFnc=process.stdout.write] Loggin function, default to console.log, if no function log is suppressed
 */
export default function fine(
  callbacks = [],
  opts = {},
  logFnc = process.stdout.write,
) {
  const options = Object.assign({}, DEFAULT_OPTS, opts);

  validateParameters(options.timeout, options.events, callbacks);

  for (const event of options.events) {
    if (!options.allowDuplicateHandlers && process.listenerCount(event) > 0) {
      throw new Error(`A ${event} handler is already registered`);
    }

    process.once(event, () => {
      const code = event.match("^SIG") ? 0 : 1;

      const t = setTimeout(() => {
        process.exit(code);
      }, options.timeout);

      if (options.unref) t.unref();

      if (typeof logFnc === "function") {
        logFnc(`[${event}] exiting with code ${code}\n`);
      }

      for (const cb of callbacks) {
        try {
          // is ugly but avoids branching the promise
          if (isAsyncFunction(cb)) {
            // biome-ignore lint/style/noArguments: its ok I want them all
            cb(event, ...arguments).catch(NOOP);
          } else {
            // biome-ignore lint/style/noArguments: its ok I want them all
            cb(event, ...arguments);
          }
        } catch {}
      }
    });
  }
}
