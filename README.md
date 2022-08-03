# fine

<!-- PROJECT SHIELDS -->

<!-- ![tests](https://github.com/simonecorsi/fine/workflows/test/badge.svg) -->

> "Fine" means "End" in Italian.  
> [fì-ne] Cessazione definitiva, punto estremo, nello spazio e nel tempo di qualcosa.  
> The point in time when an action, event, or phenomenon ceases or is completed; the conclusion. 

## About

Zero dependency and opinionated package that gracefully shutdown Node.js applications.

It provides extendability by taking an array of callbacks that will be executed serially to allow closing user-defined resources, eg: a database connection, drain streams, etc; before timeout exits the main process.

## ESM

This package now exports both `ESM` and `CommonJS`. If, for some reason, you really really need only the CommonJS version refer to `v1.4.0`.

## Table of contents

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  - [Arguments](#arguments)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<!-- tocstop -->

## Installation

You can install locally

```sh
npm i @scdev/fine
```

<!-- USAGE EXAMPLES -->

## Usage

```js
// Example
const http = require("http");
const { promisify } = require("util");
const fine = require("@scdev/fine");

const server = http.createServer(/* your handler */);

fine(
  [
    // Tip: you can wait that all connection are closed
    promisify(server.close),
    // or you can just sto accepting new one and continue closing other callbacks
    server.close,

    async () => {
      // Throws will be NOOP-ed
      await db.disconnect();
    },
  ],
  {
    timeout: 2000,
    events: ["SIGINT", "SIGTERM", "uncaughtException", "unhandledRejection"],
  }
);

// ...
```

### Arguments

```js
fine(callbacks, options);
```

| parameter         | type       | description                                                           | default                                                            |
| ----------------- | ---------- | --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `callbacks`       | function[] | Collection of callback for custom closing events, eg: db.disconnect() | `[]`                                                               |
| `options.timeout` | Number     | The time before exiting the process                                   | `2000`                                                             |
| `options.events`  | string[]   | The events the process will listen on                                 | `["SIGINT", "SIGTERM", "uncaughtException", "unhandledRejection"]` |
| `options.unref`   | boolean    | Should the timeout keep the process alive or not                      | `false`                                                            |

<!-- CONTRIBUTING -->

## Contributing

Project is pretty simple and straight forward for what is my needs, but if you have any idea you're welcome!

This projects uses [commitlint](https://commitlint.js.org/) with Angular configuration so be sure to use standard commit format or PR won't be accepted

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat(scope): some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

<!-- CONTACT -->

## Contact

Simone Corsi - [@im_simonecorsi](https://twitter.com/im_simonecorsi)
