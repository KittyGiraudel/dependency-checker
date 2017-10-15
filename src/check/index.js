const ora = require('ora')
const { map } = require('asyncro')
const display = require('../display')
const getDependencies = require('../getDependencies')
const evaluate = require('../evaluate')

const check = async options => {
  let spinner

  if (options.reporter === 'cli') {
    spinner = ora('Evaluating dependencies…').start()
  }

  const dependencies = getDependencies(options)
  const mapper = evaluate(options.pr)
  const entries = (await map(dependencies, mapper)).filter(Boolean)

  if (options.reporter === 'cli') {
    spinner.stop()
    display(entries)
  }

  if (options.reporter === 'json') {
    return entries
  }
}

module.exports = check
