const test = require('ava')
const getPackageVersions = require('./')

test('Should get package versions', async t => {
  const actual = await getPackageVersions('node-legofy')
  const expected = [
    '0.1.0',
    '0.1.1',
    '0.1.2',
    '0.1.3',
    '0.1.4',
    '0.1.5',
    '0.1.6',
    '0.1.7'
  ]

  t.deepEqual(actual, expected)
})
