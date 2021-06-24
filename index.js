"use strict";

const {
  types: { isPromise },
} = require("util");

const NOOP = () => undefined;

module.exports = (opts = {}, closeFunctions = []) => {
  const options = Object.assign(
    {
      timeout: 2000,
      catchPromisesReject: true,
    },
    opts
  );

  let events = ["SIGINT", "SIGTERM", "uncaughtException"];

  if (options.catchPromisesReject) {
    events.push("unhandledRejection");
  }
  for (const event of events) {
    process.once(event, () => {
      const code = event.match("^SIG") ? 0 : 1;
      process.stdout.write(`[${event}] exiting with code ${code}\n`);
      if (Array.isArray(closeFunctions)) {
        for (const cb of closeFunctions) {
          try {
            if (typeof cb === "function") {
              const p = cb();
              if (isPromise(p)) p.catch(NOOP);
            }
            // eslint-disable-next-line no-empty
          } catch (_) {}
        }
      }
      setTimeout(() => {
        process.exit(code);
      }, options.timeout).unref();
    });
  }
};
