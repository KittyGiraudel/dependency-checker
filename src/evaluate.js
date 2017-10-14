const semver = require('semver')
const getLatestVersion = require('./getLatestVersion')

const evaluate = includePreReleases => async dependency => {
  const { name, range, type } = dependency

  if (!semver.validRange(range)) {
    return null
  }

  const {
    latest,
    safe
  } = await getLatestVersion(name, range, includePreReleases)

  if (range.includes(latest)) {
    return null
  }

  return {
    latest,
    range,
    name,
    type,
    safe
  }
}

module.exports = evaluate
