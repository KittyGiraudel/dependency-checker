const test = require('ava')
const getLatestVersion = require('./')

test('Should retrieve latest version for a package', async t => {
  const actual = await getLatestVersion('node-legofy', '^0.1.7')
  const expected = {
    safe: false,
    latest: '0.1.7'
  }

  t.deepEqual(actual, expected)
})

test('Should return unsafe if package is pre 1.0.0', async t => {
  const actual = await getLatestVersion('node-legofy', '^0.1.7')
  const expected = {
    safe: false,
    latest: '0.1.7'
  }

  t.deepEqual(actual, expected)
})

test('Should return unsafe if there is no satisfying version', async t => {
  const actual = await getLatestVersion('sass-semver', '^0.5.1')
  const expected = {
    safe: false,
    latest: '1.0.3'
  }

  t.deepEqual(actual, expected)
})

test('Should return unsafe if there is a major bump', async t => {
  const actual = await getLatestVersion('sassdoc', '^1.1.0')
  const expected = {
    safe: false,
    latest: '2.3.0'
  }

  t.deepEqual(actual, expected)
})

test('Should return safe if there is no major bump and it’s post 1.0.0', async t => {
  const actual = await getLatestVersion('sass-semver', '^1.0.0')
  const expected = {
    safe: true,
    latest: '1.0.3'
  }

  t.deepEqual(actual, expected)
})
