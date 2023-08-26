const QueryParser = require('../src/utils/queryparser')

describe('query parser', () => {
  describe('filter', () => {
    it('parses valid filter correctly', () => {
      const f = QueryParser.parseFilter('name_sv=test')
      expect(f).toHaveProperty('name_sv')
      expect(f.name_sv).toEqual('test')
    })

    it('returns empty object on null value', () => {
      const f = QueryParser.parseFilter(' ')
      expect(f).toEqual({})
    })
  })

  describe('sort', () => {
    it('parses valid sort correctly', () => {
      const s = QueryParser.parseSort('-name_sv,name_fi')
      expect(s.length).toEqual(2)
      expect(s[0].column).toEqual('name_sv')
      expect(s[0].order).toEqual('desc')
      expect(s[1].column).toEqual('name_fi')
    })

    it('returns empty array on null value', () => {
      const s = QueryParser.parseSort(' ')
      expect(s).toEqual([])
    })
  })
})
