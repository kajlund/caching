/**
 * App class
 */

const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
// const pino = require('pino-http')
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean')

const logger = require('./utils/logger')
const router = require('./router')

class App {
  constructor(cnf) {
    this.cnf = cnf
    this.app = express()
    this.router = router
  }

  _setupMiddleware() {
    // security middleware
    this.app.use(helmet())
    this.app.use(xss())
    this.app.use(cors())

    this.app.use(cookieParser(this.cnf.cookieSecret))
    this.app.use(express.json({ limit: '10kb' }))
    this.app.use(express.urlencoded({ extended: true }))

    // rate limiter
    const limiter = rateLimit({
      max: 1000,
      windowMs: 60 * 60 * 1000,
      message: 'Too many requests from this client',
    })
    this.app.use('/api', limiter)
  }

  _setupRoutes() {
    this.app.get('/ping', (req, res) => res.send('PONG'))
    this.router.initializeRouter(this.app)
  }

  _setViewEngine() {}

  initialize() {
    this._setupMiddleware()
    this._setViewEngine()
    this._setupRoutes()
  }

  start() {
    this.app.listen(this.cnf.port, () => {
      logger.info(`Server listening on ${this.cnf.port}`)
    })
  }
}

module.exports = App
