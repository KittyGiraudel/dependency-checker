const ora = require('ora')
const { map } = require('asyncro')
const program = require('./program')
const display = require('./display')
const getDependencies = require('./getDependencies')
const evaluate = require('./evaluate')
const spinner = ora('Evaluating dependencies…').start()

map(
  getDependencies(program),
  evaluate(program.pr)
)
  .then(entries => {
    spinner.stop()

    return display(entries.filter(Boolean))
  })
  .catch(console.error.bind(console))
