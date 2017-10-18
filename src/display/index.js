const chalk = require('chalk')
const {
  isSafe,
  isUnsafe,
  isDev,
  isPeer,
  isRegular
} = require('../utils')

const TYPE_TO_MODE = {
  'DEV': '--save-dev',
  'PEER': '--save-peer',
  'REGULAR': '--save'
}

/**
 * Log a single dependency line.
 * @param {Object} entry - Dependency to log
 * @param {String} entry.name - Name of the dependency
 * @param {String} entry.range - Range as specified in package.json
 * @param {String} entry.latest - Latest version of dependency
 */
const logLine = entry => {
  console.log(`* ${chalk.magenta(entry.name)} is currently in ${chalk.yellow(entry.range)} but ${chalk.blue(entry.latest)} is available.`)
}

/**
 * Log a `npm install` command for given `type` and list of `dependencies`.
 * @param {Object[]} entries - Collection of dependencies
 * @param {String} type - `DEV` or `PEER` or `REGULAR`
 */
const logCommand = (entries, type) => {
  if (entries.length === 0) {
    return
  }

  const command = entries.reduce((cmd, entry) => {
    return cmd + ' ' + entry.name
  }, `npm install ${TYPE_TO_MODE[type]}`)

  console.log(chalk.grey(command))
}

/**
 * Main display function: split given collection of dependencies in safe and
 * unsafe updates and log one then the other, as well as `npm install` commands.
 * @param {Object[]} entries - Collection of dependencies
 */
const display = entries => {
  const safe = entries.filter(isSafe)
  const unsafe = entries.filter(isUnsafe)

  if (unsafe.length) {
    console.log('Unsafe updates')
    console.log('==============')
    console.log(chalk.gray(
      'Major version bumps or any version bumps ' +
      'prior to the first major release (0.y.z).'
    ))
    console.log('')
    unsafe.forEach(logLine)
    console.log('')
    logCommand(unsafe.filter(isRegular), 'REGULAR')
    logCommand(unsafe.filter(isDev), 'DEV')
    logCommand(unsafe.filter(isPeer), 'PEER')
    console.log('')
    console.log('')
  }

  if (safe.length) {
    console.log('Safe updates')
    console.log('============')
    console.log(chalk.gray('Minor and patch versions bumps.'))
    console.log('')
    safe.forEach(logLine)
    console.log('')
    logCommand(safe.filter(isRegular), 'REGULAR')
    logCommand(safe.filter(isDev), 'DEV')
    logCommand(safe.filter(isPeer), 'PEER')
    console.log('')
  }

  if (safe.length || unsafe.length) {
    console.log(chalk.green('Report bugs or contribute at:'))
    console.log(chalk.green('https://github.com/HugoGiraudel/dependency-checker'))
  }
}

module.exports = display
