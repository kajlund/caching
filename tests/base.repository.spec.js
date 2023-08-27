const { test } = require('@japa/runner')
const BaseRepository = require('../src/db/base.repository')

test.group('BaseRepository', (group) => {
  let repo

  group.each.setup(() => {
    repo = new BaseRepository({
      table: 'test',
      filter: '',
      sort: [{ column: 'name' }],
      limit: 25,
      skip: 5,
      descField: 'desc',
    })
  })

  test('constructor', ({ assert }) => {
    assert.isFunction(repo.db)
    assert.equal(repo.table, 'test')
    assert.equal(repo.descField, 'desc')
    assert.isObject(repo.defaultQuery)
  })

  test('query as configured', ({ assert }) => {
    const actual = repo.defaultQuery
    const expected = { filter: {}, sort: [{ column: 'name' }], limit: 25, skip: 5 }
    assert.deepEqual(actual, expected)
  })
})
