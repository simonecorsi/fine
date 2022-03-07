"use strict";

const {
  types: { isPromise },
} = require("util");

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
 * @param {Array<() => any>} [callbacks=[]]
 * @param {FineOptions} [opts={}]
 */
function validateParameters(callbacks = [], opts = {}) {
  if (typeof opts.timeout !== "number") {
    throw new TypeError("timeout parameter must be number");
  }
  if (!Array.isArray(opts.events)) {
    throw new TypeError("events parameter must be an array of strings");
  }

  if (!Array.isArray(callbacks)) {
    throw new TypeError("callbacks parameter must be an array of functions");
  } else {
    callbacks.map((cb) => {
      if (typeof cb !== "function") {
        throw new TypeError("callback must be a function");
      }
    });
  }
}

/**
 * @param {Array<() => any>} [callbacks=[]]
 * @param {FineOptions} [opts={}]
 */
function fine(callbacks = [], opts = {}) {
  const options = Object.assign({}, DEFAULT_OPTS, opts);

  validateParameters(callbacks, options);

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

      process.stdout.write(`[${event}] exiting with code ${code}\n`);
      for (const cb of callbacks) {
        try {
          if (typeof cb === "function") {
            const p = cb();
            if (isPromise(p)) p.catch(NOOP);
          }
          // eslint-disable-next-line no-empty
        } catch (_) {}
      }
    });
  }
}

if (process.env.NODE_ENV === "test") {
  exports.DEFAULT_OPTS = DEFAULT_OPTS;
  exports.validateParameters = validateParameters;
  exports.fine = fine;
} else {
  module.exports = fine;
}
