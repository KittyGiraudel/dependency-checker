const path = require('path')

const getDependencies = program => {
  const pkg = require(path.resolve(program.package))
  const dependencies = []

  Object.keys(pkg.dependencies).forEach(packageName => {
    dependencies.push({
      name: packageName,
      range: pkg.dependencies[packageName],
      type: 'REGULAR'
    })
  })

  program.dev && Object.keys(pkg.devDependencies).forEach(packageName => {
    dependencies.push({
      name: packageName,
      range: pkg.devDependencies[packageName],
      type: 'DEV'
    })
  })

  program.peer && Object.keys(pkg.peerDependencies).forEach(packageName => {
    dependencies.push({
      name: packageName,
      range: pkg.peerDependencies[packageName],
      type: 'PEER'
    })
  })

  return dependencies
}

module.exports = getDependencies
