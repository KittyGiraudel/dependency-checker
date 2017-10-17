const ora = require('ora')
const { map } = require('asyncro')
const display = require('../display')
const getDependencies = require('../getDependencies')
const evaluate = require('../evaluate')

/**
 * Main function: get dependencies from given JSON file, check if whether they
 * are outdated and report the results.
 * @param {Object} options - Program’s options
 * @param {String} options.package - Path to `package.json`
 * @param {String} options.reporter - `cli` or `json`
 * @param {Boolean} options.pr - Whether to include pre-releases
 * @returns {Object[]} Collection of dependencies to update
 */
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
    console.log(JSON.stringify(entries))
  }

  return entries
}

module.exports = check
