const semver = require('semver')

const isPreRelease = version => semver.prerelease(version) !== null
const isNotPreRelease = version => semver.prerelease(version) === null
const getVersionFromRange = range => range.replace(/[~^]/g, '')
const isSafe = dep => dep.safe
const isUnsafe = dep => !dep.safe
const isDev = dep => dep.type === 'DEV'
const isPeer = dep => dep.type === 'PEER'
const isRegular = dep => dep.type === 'REGULAR'

module.exports = {
  getVersionFromRange,
  isPreRelease,
  isNotPreRelease,
  isSafe,
  isUnsafe,
  isDev,
  isPeer,
  isRegular
}
