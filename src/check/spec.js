const test = require('ava')
const check = require('./')

test('Should return JSON in `json` reporter', async t => {
  const actual = await check({
    package: './package.json',
    reporter: 'json',
    dev: false,
    peer: false,
    pr: false,
  })

  t.deepEqual(typeof actual, 'object')
})
