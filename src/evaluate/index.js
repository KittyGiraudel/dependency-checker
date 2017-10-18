const semver = require('semver')
const getLatestVersion = require('../getLatestVersion')

const getVersionFromRange = range => range.replace(/[~\^]/g, '')

const evaluate = includePR =>
  /**
   * Evaluate a dependency to determine whether it is checkable, up-to-date and
   * safe to update.
   * @param {Object} dependency - Dependency to check
   * @param {Object} dependency.name - Name of the dependency
   * @param {Object} dependency.range - Range as specified in `package.json`
   * @return {null|Object} - Enhanced dependency object or `null` if up-to-date
   *                         or non-checkable dependency
   */
  async dependency => {
    const { name, range } = dependency
    // If the current specified range is a pre-release one, the check should
    // include pre-releases.
    const isRangePR = semver.prerelease(getVersionFromRange(range)) !== null
    const shouldIncludePR = isRangePR || includePR

    // If the dependency has an invalid range (e.g. Gist ID, GitHub repository…),
    // skip as there is nothing to check.
    if (!semver.validRange(range)) {
      return null
    }

    // Get the latest version for the dependency as well as whether or not it is
    // a safe bump (patch- or minor-bump post first release).
    const { latest, safe } = await getLatestVersion(name, range, shouldIncludePR)

    // If the latest version is the one specified in the range, skip because it is
    // up to date. This is not very robust but works pretty well.
    if (range.includes(latest)) {
      return null
    }

    return { ...dependency, latest, safe }
  }

module.exports = evaluate
