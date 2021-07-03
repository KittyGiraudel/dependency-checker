const path = require('path')

/**
 * Get the dependencies from `package.json`, including `devDependencies` if
 * `dev` option is specified and `peerDependencies` if `peer` option is
 * specified, then format them for the rest of program.
 * @param {Object} program - Program’s options
 * @param {String} program.package - Path to `package.json`
 * @param {Boolean} program.dev - Whether to include dev dependencies
 * @param {Boolean} program.peer - Whether to include peer dependencies
 * @return {Object[]} Collection of dependencies to check
 */
const getDependencies = program => {
  const {
    dependencies = {},
    devDependencies = {},
    peerDependencies = {},
  } = require(path.resolve(program.package))
  const deps = []

  Object.keys(dependencies).forEach(packageName => {
    deps.push({
      name: packageName,
      range: dependencies[packageName],
      type: 'REGULAR',
    })
  })

  program.dev &&
    Object.keys(devDependencies).forEach(packageName => {
      deps.push({
        name: packageName,
        range: devDependencies[packageName],
        type: 'DEV',
      })
    })

  program.peer &&
    Object.keys(peerDependencies).forEach(packageName => {
      deps.push({
        name: packageName,
        range: peerDependencies[packageName],
        type: 'PEER',
      })
    })

  return deps
}

module.exports = getDependencies
