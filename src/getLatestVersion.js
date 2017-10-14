const semver = require('semver')
const getPackageVersions = require('./getPackageVersions')

const isNotAPreRelease = version => semver.prerelease(version) === null

const getVersions = async (packageName, inclurePR) => {
  const packageVersions = await getPackageVersions(packageName)

  if (inclurePR) {
    return packageVersions
  }

  return packageVersions.filter(isNotAPreRelease)
}

const getLatestVersion = async (packageName, packageRange, inclurePR) => {
  // Get all versions for the `packageName` page, with or without pre-releases
  // depending on the value of `includePR`.
  const packageVersions = await getVersions(packageName, inclurePR)
  // Get the latest version (very last item in the array).
  const latest = packageVersions[packageVersions.length - 1]
  // Get the last version that satisfies the specified range in package.json.
  const lastSatisfying = semver.maxSatisfying(packageVersions, packageRange)
  // Check if the latest version has a different major number than the last
  // satisfying one; if it has, it’s an unsafe dependency bump as it could
  // involve breaking changes.
  const hasMajorBump = semver.major(latest) !== semver.major(lastSatisfying)
  // If the major version is at `0`, it can also involve breaking changes as
  // anything happening before 1.0.0 is unstable, therefore should be considered
  // unsafe.
  const isInZero = semver.major(latest) === 0
  const safe = !(hasMajorBump || isInZero)

  return { latest, safe }
}

module.exports = getLatestVersion
