const semver = require('semver')
const getLatestVersion = require('./getLatestVersion')

const evaluate = (dependencies, includePreReleases) => async (acc = [], name) => {
  const range = dependencies[name]

  if (!semver.validRange(range)) {
    return acc
  }

  const {
    latest,
    safe
  } = await getLatestVersion(name, range, includePreReleases)

  if (range.includes(latest)) {
    return acc
  }

  acc.push({
    latest,
    range,
    name,
    safe
  })

  return acc
}

module.exports = evaluate
