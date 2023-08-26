const { test } = require('@japa/runner')

test.group('Math.add', () => {
  test('add two numbers', ({ assert }) => {
    // Test logic goes here
    assert.equal(2 + 2, 4)
  })
})
