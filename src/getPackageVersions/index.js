const semver = require('semver')
const { packument } = require('pacote')
const { isNotPreRelease } = require('../utils')

const getVersions = packageName => {
  return packument(packageName, { fullMetadata: true }).then(packageInfo => {
    return Object.keys(packageInfo.versions).filter(
      version => !packageInfo.versions[version].deprecated
    )
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
  return getVersions(packageName)
    .then(versions => (includePR ? versions : versions.filter(isNotPreRelease)))
    .then(versions => versions.sort(semver.compareLoose))
}

module.exports = getPackageVersions
