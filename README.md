# fine

<!-- PROJECT SHIELDS -->

<!-- ![tests](https://github.com/simonecorsi/fine/workflows/test/badge.svg) -->

<!-- toc -->

- [About The Project](#about-the-project)
- [Installation](#installation)
- [Usage](#usage)
  - [Arguments](#arguments)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<!-- tocstop -->

## About The Project

The purpose of this package is gracefully exiting Node.js processes the "good way" (opinated clearly), while also providing some minir extendability!

This package also takes an array of callbacks that will get executed serially to allow closing user defined resource, eg: a database connection.

<!-- GETTING STARTED -->

## Installation

You can install locally

```sh
npm i @scdev/fine
```

<!-- USAGE EXAMPLES -->

## Usage

```js
const fine = require("@scdev/fine");
fine(
  [
    redis.disconnect,
    async () => {
      await db.disconnect();
      // some more logic
      return "ok";
    },
  ],
  {
    timeout: 2000,
    events: ["SIGINT", "SIGTERM", "uncaughtException", "unhandledRejection"],
  }
);
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

<!-- CONTRIBUTING -->

## Contributing

Project is pretty simple and straight forward for what is my needs, but if you have any idea you're welcome.

This projects uses [commitizen](https://github.com/commitizen/cz-cli) so be sure to use standard commit format or PR won't be accepted

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat(scope): some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Simone Corsi - [@im_simonecorsi](https://twitter.com/im_simonecorsi)
