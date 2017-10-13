const path = require('path')

const getDependencies = program => {
  const pkg = require(path.resolve(program.package))
  const dependencies = Object.assign({}, pkg.dependencies)

  if (program.dev) {
    Object.assign(dependencies, pkg.devDependencies)
  }

  if (program.peer) {
    Object.assign(dependencies, pkg.peerDependencies)
  }

  return dependencies
}

module.exports = getDependencies
