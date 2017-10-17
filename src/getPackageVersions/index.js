const semver = require('semver')
const npm = require('npm')

const isNotPR = version => semver.prerelease(version) === null

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

/**
 * Get all the versions of a given package, with or without pre-releases
 * depending on `includePR` parameter.
 * @param {String} packageName - Name of package to check
 * @param {Boolean} includePR - Whether to include pre-releases
 * @return {String[]} - List of package’s versions
 */
const getPackageVersions = (packageName, includePR) => {
  return loadPackage(packageName)
    .then(() => getVersions(packageName))
    .then(versions => includePR ? versions : versions.filter(isNotPR))
}

module.exports = getPackageVersions
