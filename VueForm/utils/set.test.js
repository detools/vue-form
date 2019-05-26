import test from 'tape-async'
import set from './set'

test('Parse Path to Array', async t => {
  const basicPath = 'name'
  const innerPath = 'key.value'
  const arrayPath = 'array[0][1].path[2].name'

  const target1 = {}
  set(target1, basicPath, 1)
  t.same(target1, { name: 1 }, 'Basic path works as expected')

  const target2 = {}
  set(target2, innerPath, 1)
  t.same(target2, { key: { value: 1 } }, 'Inner path works as expected')

  const target3 = {}
  set(target3, arrayPath, 1)
  t.same(
    JSON.stringify(target3),
    JSON.stringify({ array: [[null, { path: [null, null, { name: 1 }] }]] }),
    'Array path works as expected'
  )
})
