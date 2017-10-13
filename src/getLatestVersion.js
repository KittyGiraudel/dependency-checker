const semver = require('semver')
const getPackageVersions = require('./getPackageVersions')

const isNotAPreRelease = version => semver.prerelease(version) === null

const getVersions = async (packageName, includePreReleases) => {
  const packageVersions = await getPackageVersions(packageName)

  if (includePreReleases) {
    return packageVersions
  }

  return packageVersions.filter(isNotAPreRelease)
}

const getLatestVersion = async (packageName, packageRange, includePreReleases) => {
  const packageVersions = await getVersions(packageName, includePreReleases)
  const latestVersion = packageVersions[packageVersions.length - 1]
  const lastSatisfyingVersion = semver.maxSatisfying(packageVersions, packageRange)
  const hasMajorBump = semver.major(latestVersion) !== semver.major(lastSatisfyingVersion)
  const isInZero = semver.major(latestVersion) === 0

  return {
    latest: latestVersion,
    safe: !(hasMajorBump || isInZero)
  }
}

module.exports = getLatestVersion
