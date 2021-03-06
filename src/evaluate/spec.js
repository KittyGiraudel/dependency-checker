const test = require('ava')
const evaluate = require('./')

test('Should return `null` for invalid ranges', async t => {
  const e = evaluate()
  const actual = await e({
    name: 'test-dependency',
    type: 'REGULAR',
    range: 'github:KittyGiraudel/dependency-checker'
  })

  t.deepEqual(actual, null)
})

test('Should return `null` for up-to-date versions', async t => {
  const e = evaluate()
  const actual = await e({
    name: 'node-legofy',
    type: 'REGULAR',
    range: '^0.1.7'
  })

  t.deepEqual(actual, null)
})

test('Should return an object for non up-to-date versions', async t => {
  const e = evaluate()
  const actual = await e({
    name: 'node-legofy',
    type: 'REGULAR',
    range: '^0.1.5'
  })

  t.deepEqual(actual, {
    name: 'node-legofy',
    type: 'REGULAR',
    range: '^0.1.5',
    latest: '0.1.7',
    safe: false
  })
})
