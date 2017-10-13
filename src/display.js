const chalk = require('chalk')

const display = results => {
  const { unsafe, safe } = results

  console.log('Unsafe updates')
  console.log('==============')
  console.log(chalk.gray(
    'Major version bumps or any version bumps ' +
    'prior to the first major release (0.y.z).'
  ))
  unsafe.forEach(result => {
    console.log(`* ${chalk.magenta(result.name)} is currently in ${chalk.yellow(result.range)} but ${chalk.blue(result.latest)} is available.`)
  })
  console.log('')

  console.log('Safe updates')
  console.log('============')
  console.log(chalk.gray('Minor and patch versions bumps.'))
  safe.forEach(result => {
    console.log(`* ${chalk.magenta(result.name)} is currently in ${chalk.yellow(result.range)} but ${chalk.blue(result.latest)} is available.`)
  })
  console.log('')
}

module.exports = display
