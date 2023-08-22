const express = require('express')

const logger = require('./utils/logger')
const { AppError } = require('./utils/errors')
const { reasonPhrases, statusCodes } = require('./utils/statuscodes')

// Import Route Objects
const placeRoutes = require('./api/places/place.routes')

class Router {
  constructor() {
    this.router = express.Router()
    this.apiRoutes = [placeRoutes]
    this.webRoutes = []
  }

  _attachRoutes(routeGroups, prefix = '') {
    routeGroups.forEach(({ group, routes }) => {
      routes.forEach(({ method, path, middleware = [], handler }) => {
        logger.info(`Route: ${method} ${prefix}${group.prefix}${path}`)
        this.router[method](
          prefix + group.prefix + path,
          [...(group.middleware || []), ...middleware],
          this._catchError(handler),
        )
      })
    })
  }

  _catchError(route) {
    return (req, res, next) => {
      route(req, res, next).catch(next)
    }
  }

  _handleExceptions() {
    this.router.use((err, req, res, _next) => {
      logger.error(err)
      const error = {
        statusCode: err.status || err.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
      }

      // Faulty UUID format will generate Knex error
      if (err.code) {
        if (err.code === '22P02') {
          error.statusCode = statusCodes.BAD_REQUEST
          error.message = reasonPhrases.BAD_REQUEST
          error.detail = 'Faulty uuid format'
        }
        // Unique constraint error
        if (err.code === '23505') {
          error.statusCode = statusCodes.BAD_REQUEST
          error.message = reasonPhrases.BAD_REQUEST
          error.detail = err.detail
        }
        if (err.code === '42703') {
          error.statusCode = statusCodes.BAD_REQUEST
          error.message = reasonPhrases.BAD_REQUEST
          error.detail = 'Database error: Check field names'
        }
      }

      if (err instanceof AppError) {
        error.message = err.message
        error.detail = err.detail
      }

      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        detail: error.detail || '',
      })
    })
  }

  _handlePageNotFound() {
    this.router.all('*', (req, res) => {
      res.status(statusCodes.NOT_FOUND).json({
        success: false,
        message: reasonPhrases.NOT_FOUND,
      })
    })
  }

  initializeRouter(app) {
    this._attachRoutes(this.apiRoutes, '/api/v1')

    this._handlePageNotFound()
    this._handleExceptions()

    // register router
    app.use(this.router)
  }
}

module.exports = new Router() // Export single instance
