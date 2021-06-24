# fine

<!-- PROJECT SHIELDS -->

![tests](https://github.com/simonecorsi/fine/workflows/test/badge.svg)

<!-- toc -->

- [fine](#fine)
  - [About The Project](#about-the-project)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Arguments](#arguments)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

<!-- tocstop -->

## About The Project

This packages aim is to simplify programmatically generate flags to use in Unix-style command by declaring them with an object literal and turning them into an array or a string of usable flags.

Here's why:

- You exec/spawn commands and need to provide options
- You want to dynamically add flags without bunch of string concats
- you don't want to have an headache refactoring when needed

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
fine({ timeout: 2000 }, [() => db.disconnect()]);
```

### Arguments

| parameter | type    | description                                                                 | default |
| --------- | ------- | --------------------------------------------------------------------------- | ------- |
| opts       | Object  | Options object                                 | {}   |
| opts.timeout       | Number  | The time before exiting the process                                 | 2000   |
| closeFunctions | function[] | Collection of callback for custom closing events, eg: db.disconnect()  | |

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
