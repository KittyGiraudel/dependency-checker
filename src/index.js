const { reduce } = require('asyncro')
const program = require('./program')
const display = require('./display')
const getDependencies = require('./getDependencies')
const evaluate = require('./evaluate')
const dependencies = getDependencies(program)
const packageNames = Object.keys(dependencies)
const evaluator = evaluate(dependencies, program.pr)

reduce(packageNames, evaluator)
  .then(entries => ({
    unsafe: entries.filter(entry => !entry.safe),
    safe: entries.filter(entry => entry.safe)
  }))
  .then(display)
  .catch(console.error.bind(console))
