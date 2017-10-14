const ora = require('ora')
const { reduce } = require('asyncro')
const program = require('./program')
const display = require('./display')
const getDependencies = require('./getDependencies')
const evaluate = require('./evaluate')
const dependencies = getDependencies(program)
const packageNames = Object.keys(dependencies)
const evaluator = evaluate(dependencies, program.pr)
const spinner = ora('Evaluating dependencies…').start()

reduce(packageNames, evaluator)
  .then(entries => {
    spinner.stop()

    return display({
      unsafe: entries.filter(entry => !entry.safe),
      safe: entries.filter(entry => entry.safe)
    })
  })
  .catch(console.error.bind(console))
