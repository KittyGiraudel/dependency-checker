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

  -p, --package <package>  Path to package.json
  -d, --dev                Whether to check devDependencies
  -p, --peer               Whether to check peerDependencies
  --no-pr                  Whether to exclude pre-release versions
  -h, --help               output usage information
```

## Example

```
$ dependency-checker ./package.json

Unsafe updates
==============
Major version bumps or any version bumps prior to the first major release (0.y.z).
* express-graphql is currently in ^0.6.6 but 0.6.11 is available.
* fela is currently in ^5.1.1 but 6.0.2 is available.

Safe updates
============
Minor and patch versions bumps.
* body-parser is currently in ^1.17.2 but 1.18.2 is available.
* contentful is currently in ^4.5.0 but 4.6.2 is available.
```
