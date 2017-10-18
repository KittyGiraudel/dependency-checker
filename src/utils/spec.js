const test = require('ava')
const {
  getVersionFromRange,
  isPreRelease,
  isNotPreRelease,
  isSafe,
  isUnsafe,
  isDev,
  isPeer,
  isRegular
} = require('./')

test('getVersionFromRange', t => {
  t.is(getVersionFromRange('^1.2.3'), '1.2.3')
  t.is(getVersionFromRange('~1.2.3'), '1.2.3')
  t.is(getVersionFromRange('1.2.3'), '1.2.3')
})

test('isPreRelease', t => {
  t.is(isPreRelease('1.2.3'), false)
  t.is(isPreRelease('^1.2.3'), false)
  t.is(isPreRelease('~1.2.3'), false)
  t.is(isPreRelease('1.2.3-foo'), true)
  t.is(isPreRelease('1.2.3-beta'), true)
})

test('isNotPreRelease', t => {
  t.is(isNotPreRelease('1.2.3'), true)
  t.is(isNotPreRelease('^1.2.3'), true)
  t.is(isNotPreRelease('~1.2.3'), true)
  t.is(isNotPreRelease('1.2.3-foo'), false)
  t.is(isNotPreRelease('1.2.3-beta'), false)
})

test('isSafe', t => {
  t.is(isSafe({ safe: true }), true)
  t.is(isSafe({ safe: false }), false)
})

test('isUnsafe', t => {
  t.is(isUnsafe({ safe: true }), false)
  t.is(isUnsafe({ safe: false }), true)
})

test('isDev', t => {
  t.is(isDev({ type: 'DEV' }), true)
  t.is(isDev({ type: 'REGULAR' }), false)
  t.is(isDev({ type: 'PEER' }), false)
  t.is(isDev({}), false)
})

test('isPeer', t => {
  t.is(isPeer({ type: 'DEV' }), false)
  t.is(isPeer({ type: 'REGULAR' }), false)
  t.is(isPeer({ type: 'PEER' }), true)
  t.is(isPeer({}), false)
})

test('isRegular', t => {
  t.is(isRegular({ type: 'DEV' }), false)
  t.is(isRegular({ type: 'REGULAR' }), true)
  t.is(isRegular({ type: 'PEER' }), false)
  t.is(isRegular({}), false)
})
