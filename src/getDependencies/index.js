const path = require('path')

const getDependencies = program => {
  const {
    dependencies = {},
    devDependencies = {},
    peerDependencies = {}
  } = require(path.resolve(program.package))
  const deps = []

  Object.keys(dependencies).forEach(packageName => {
    deps.push({
      name: packageName,
      range: dependencies[packageName],
      type: 'REGULAR'
    })
  })

  program.dev && Object.keys(devDependencies).forEach(packageName => {
    deps.push({
      name: packageName,
      range: devDependencies[packageName],
      type: 'DEV'
    })
  })

  program.peer && Object.keys(peerDependencies).forEach(packageName => {
    deps.push({
      name: packageName,
      range: peerDependencies[packageName],
      type: 'PEER'
    })
  })

  return deps
}

module.exports = getDependencies
