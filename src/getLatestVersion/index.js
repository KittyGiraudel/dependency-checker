const semver = require('semver')
const getPackageVersions = require('../getPackageVersions')

/**
 * Get the latest version of a package and whether it is safe to update based on
 * the given range.
 * @param {String} packageName - Name of the package
 * @param {String} packageRange - Range as specified in `package.json`
 * @param {Boolean} includePR - Whether to include pre-releases
 * @return {Object} - Latest version of a package and whether safe to update
 */
const getLatestVersion = async (packageName, packageRange, includePR) => {
  // Get all versions for the `packageName` page, with or without pre-releases
  // depending on the value of `includePR`.
  const packageVersions = await getPackageVersions(packageName, includePR)
  // Get the latest version (very last item in the array).
  const latest = packageVersions[packageVersions.length - 1]
  // If a dependency is fully deprecated, there won’t be any version, and
  // therefore it should be ignored entirely.
  if (!latest) return {}

  // Get the last version that satisfies the specified range in package.json.
  const lastSatisfying = semver.maxSatisfying(packageVersions, packageRange)
  // Check if the latest version has a different major number than the last
  // satisfying one; if it has, it’s an unsafe dependency bump as it could
  // involve breaking changes.
  const hasMajorBump =
    !lastSatisfying || semver.major(latest) !== semver.major(lastSatisfying)
  // If the major version is at `0`, it can also involve breaking changes as
  // anything happening before 1.0.0 is unstable, therefore should be considered
  // unsafe.
  const isInZero = semver.major(latest) === 0
  const safe = !(hasMajorBump || isInZero)

  return { latest, safe }
}

module.exports = getLatestVersion
