const path = require('path')
const test = require('ava')
const getDependencies = require('./')
const pkg = require(path.resolve('./package.json'))

test('Should throw for not found package.json', t => {
  const error = t.throws(() => {
    getDependencies({
      package: './foo.json',
      dev: false,
      peer: false
    })
  })

  t.regex(error.message, /Cannot find module/)
})

test('Should return formatted dependencies', t => {
  const actual = getDependencies({
    package: './package.json',
    dev: false,
    peer: false
  })
  const expected = Object.keys(pkg.dependencies).reduce((acc, dep) => {
    return acc.concat({
      name: dep,
      range: pkg.dependencies[dep],
      type: 'REGULAR'
    })
  }, [])

  t.deepEqual(actual, expected)
})

test('Should include dev dependencies if `dev` option is passed', t => {
  const actual = getDependencies({
    package: './package.json',
    dev: true,
    peer: false
  })
  const expected = Object.keys(pkg.dependencies).reduce((acc, dep) => {
    return acc.concat({
      name: dep,
      range: pkg.dependencies[dep],
      type: 'REGULAR'
    })
  }, []).concat(Object.keys(pkg.devDependencies).reduce((acc, dep) => {
    return acc.concat({
      name: dep,
      range: pkg.devDependencies[dep],
      type: 'DEV'
    })
  }, []))

  t.deepEqual(actual, expected)
})

test('Should not throw if peer passed but no peerDependencies found', t => {
  t.notThrows(() => {
    getDependencies({
      package: './package.json',
      dev: false,
      peer: true
    })
  })
})
