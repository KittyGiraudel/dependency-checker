const npm = require('npm')

const loadPackage = name => {
  return new Promise((resolve, reject) => {
    npm.load({ name, loglevel: 'silent' }, err => {
      if (err) reject(err)
      else resolve()
    })
  })
}

const getVersions = packageName => {
  return new Promise((resolve, reject) => {
    npm.commands.show([ packageName, 'versions' ], true, (err, data) => {
      if (err) reject(err)
      else resolve(data[Object.keys(data)[0]].versions)
    })
  })
}

const getPackageVersions = packageName => {
  return loadPackage(packageName)
    .then(() => getVersions(packageName))
}

module.exports = getPackageVersions
