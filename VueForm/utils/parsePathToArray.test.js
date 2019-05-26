import test from 'tape-async'
import parsePathToArray from './parsePathToArray'

test('Parse Path to Array', async t => {
  const basicPath = 'name'
  const innerPath = 'key.value'
  const arrayPath = 'array[0][1].path[2].name'

  t.same(parsePathToArray(basicPath), 'name', 'Basic path works as expected')
  t.same(parsePathToArray(innerPath), ['key', 'value'], 'Inner path works as expected')
  t.same(
    parsePathToArray(arrayPath),
    ['array', '[0]', '[1]', 'path', '[2]', 'name'],
    'Array path works as expected'
  )
})
