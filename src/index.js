const ora = require('ora')
const { map } = require('asyncro')
const display = require('./display')
const getDependencies = require('./getDependencies')
const evaluate = require('./evaluate')

const check = async options => {
  const spinner = ora('Evaluating dependencies…').start()
  try {
    const entries = await map(
      getDependencies(options),
      evaluate(options.pr)
    )
    spinner.stop()
    display(entries.filter(Boolean))
  } catch (error) {
    spinner.stop()
    console.error(error)
  }
}

module.exports = check
