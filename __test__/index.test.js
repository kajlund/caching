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

describe('ping', () => {
  it('returns 200 pong', async () => {
    const res = await request(app).get('/ping')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('PONG')
  })
})

describe('Faulty routes', () => {
  it('returns 404 on faulty route', async () => {
    const res = await request(app).get('/faulty')
    expect(res.statusCode).toEqual(404)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toEqual('Not Found')
  })
})
