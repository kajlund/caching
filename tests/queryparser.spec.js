const { test } = require('@japa/runner')
const QueryParser = require('../src/utils/queryparser')

test.group('QueryParser.filter', () => {
  test('parse filter', ({ assert }) => {
    const actual = QueryParser.parseFilter('name_sv=test')
    const expected = { name_sv: 'test' }
    assert.deepEqual(actual, expected)
  })
  test('parse no filter expression', ({ assert }) => {
    const actual = QueryParser.parseFilter(' ')
    const expected = {}
    assert.deepEqual(actual, expected)
  })
})

test.group('QueryParser.sort', () => {
  test('parse valid sort expression', ({ assert }) => {
    const actual = QueryParser.parseSort('-name_sv,name_fi')
    const expected = [{ column: 'name_sv', order: 'desc' }, { column: 'name_fi' }]
    assert.deepEqual(actual, expected)
  })
  test('parse no sort expression', ({ assert }) => {
    const actual = QueryParser.parseSort(' ')
    const expected = []
    assert.deepEqual(actual, expected)
  })
})
