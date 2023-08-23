const request = require('supertest')

const cnf = require('../src/config')
const App = require('../src/app')

let app

beforeAll(async () => {
  const server = new App(cnf)
  await server.initialize()
  app = server.app
  return
})

describe('List places', () => {
  it('returns default places', async () => {
    const res = await request(app).get('/api/v1/places')
    expect(res.statusCode).toEqual(200)
    expect(res.body.success).toEqual(true)
    expect(res.body.count).toEqual(25)
  })

  it('returns expected number of places', async () => {
    const res = await request(app).get('/api/v1/places?limit=100')
    expect(res.body.count).toEqual(100)
  })
})
