"use strict";

const {
  types: { isPromise },
} = require("util");

const NOOP = () => undefined;

const DEFAULT_EVENTS = [
  "SIGINT",
  "SIGTERM",
  "uncaughtException",
  "unhandledRejection",
];

function validateParameters(timeout, events, callbacks) {
  if (typeof timeout !== "number") {
    throw new TypeError("timeout parameter must be number");
  }
  if (!Array.isArray(events)) {
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

const DEFAULT_OPTS = {
  timeout: 2000,
  events: DEFAULT_EVENTS,
};

module.exports = function fine(callbacks = [], opts = {}) {
  const options = Object.assign({}, DEFAULT_OPTS, opts);

  validateParameters(options.timeout, options.events, callbacks);

  for (const event of options.events) {
    if (process.listenerCount(event) > 0) {
      throw new Error(`A ${event} handler is already registered`);
    }
    process.once(event, () => {
      const code = event.match("^SIG") ? 0 : 1;
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
      setTimeout(() => {
        process.exit(code);
      }, options.timeout);
    });
  }
};
