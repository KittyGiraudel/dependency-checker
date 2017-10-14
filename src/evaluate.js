const semver = require('semver')
const getLatestVersion = require('./getLatestVersion')

const evaluate = includePR => async dependency => {
  const { name, range, type } = dependency

  // If the dependency has an invalid range (e.g. Gist ID, GitHub repository…),
  // skip as there is nothing to check.
  if (!semver.validRange(range)) {
    return null
  }

  // Get the latest version for the dependency as well as whether or not it is
  // a safe bump (patch- or minor-bump post first release).
  const { latest, safe } = await getLatestVersion(name, range, includePR)

  // If the latest version is the one specified in the range, skip because it is
  // up to date. This is not very robust but works pretty well.
  if (range.includes(latest)) {
    return null
  }

  return { latest, range, name, type, safe }
}

module.exports = evaluate
