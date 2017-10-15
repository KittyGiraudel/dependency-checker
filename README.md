# Dependency checker

A simple CLI script to check dependencies from a `package.json`.

## Install

```
npm install dependency-checker --global
```

## Usage

```
Usage: dependency-checker [options]

Options:

  -p, --package <package>   Path to package.json
  -d, --dev                 Whether to check devDependencies
  -p, --peer                Whether to check peerDependencies
  -r, --reporter [reporter] Reporter to use (cli or json)
  --no-pr                   Whether to exclude pre-release versions
  -h, --help                output usage information
```

Or through Node.js:

```js
const dependendyChecker = require('dependency-checker')

const deps = await dependencyChecker({
  package: 'path/to/package.json',
  dev: true,
  peer: false,
  pr: false,
  reporter: 'json'
})
```

## Examples

```
$ dependency-checker -p ./package.json

Unsafe updates
==============
Major version bumps or any version bumps prior to the first major release (0.y.z).

* express-graphql is currently in ^0.6.6 but 0.6.11 is available.
* babel-preset-react-app is currently in ^2.0.2 but 3.0.3 is available.

npm install --save express-graphql
npm install --save-dev babel-preset-react-app

Safe updates
============
Minor and patch versions bumps.

* body-parser is currently in ^1.17.2 but 1.18.2 is available.
* contentful is currently in ^4.5.0 but 4.6.2 is available.

npm install --save body-parser contentful
```

---

```
$ dependency-checker -p ./package.json -r json > dependencies.json
```

```json
[
  {
    "name": "express-graphql",
    "range": "^0.6.6",
    "latest": "0.6.11",
    "safe": false,
    "type": "REGULAR"
  },
  {
    "name": "babel-preset-react-app",
    "range": "^2.0.2",
    "latest": "3.0.3",
    "safe": false,
    "type": "DEV"
  },
  {
    "name": "body-parser",
    "range": "^1.17.2",
    "latest": "1.18.2",
    "safe": true,
    "type": "REGULAR"
  },
  {
    "name": "contentful",
    "range": "^4.5.0",
    "latest": "4.6.2",
    "safe": true,
    "type": "REGULAR"
  }
]
```
