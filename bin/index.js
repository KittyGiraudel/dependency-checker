#!/usr/bin/env node
const program = require('commander')
const dependencyChecker = require('../src/check')

program
  .option('-p, --package <package>', 'Path to package.json')
  .option('-d, --dev', 'Whether to check devDependencies')
  .option('-p, --peer', 'Whether to check peerDependencies')
  .option('-r, --reporter [reporter]', 'Reporter to use (cli or json)')
  .option('--no-pr', 'Whether to exclude pre-release versions')
  .parse(process.argv)

if (!program.package) {
  throw new Error('Missing `--package` (`-p`) argument.')
}

if (!program.reporter) {
  program.reporter = 'cli'
}

dependencyChecker(program)
