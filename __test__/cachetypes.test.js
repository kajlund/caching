const request = require('supertest')
const { matchersWithOptions } = require('jest-json-schema')
const db = require('../src/db')

expect.extend(
  matchersWithOptions({
    verbose: true,
  }),
)

const cnf = require('../src/config')
const App = require('../src/app')

let app

const listSchema = {
  properties: {
    success: { type: 'boolean' },
    msg: { type: 'string' },
    query: { type: 'object' },
    count: { type: 'integer' },
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
        },
      },
    },
  },
  // required: ['success, msg, query'],
}

describe('CacheTypes', () => {
  beforeAll(async () => {
    const server = new App(cnf)
    await server.initialize()
    app = server.app
  })

  afterAll(async () => {
    db.destroy()
  })

  describe('Listing should return cachetypes list', (done) => {
    it('returns correct response format', async () => {
      const res = await request(app).get('/api/v1/cachetypes')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toMatchSchema(listSchema)
      done()
    })

    it('should filter', async () => {
      expect.assertions(2)
      const res = await request(app).get('/api/v1/cachetypes?filter=name=CITO')
      expect(res.statusCode).toEqual(200)
      expect(res.body.query.filter.name).toEqual('CITO')
    })
  })
})
