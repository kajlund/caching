const { reasonPhrases, statusCodes } = require('./statuscodes')

class AppError extends Error {
  constructor(
    message = reasonPhrases.INTERNAL_SERVER_ERROR,
    status = statusCodes.INTERNAL_SERVER_ERROR,
    detail = '',
  ) {
    super(message)
    this.status = status
    this.name = this.constructor.name
    this.detail = detail
    Error.captureStackTrace(this, this.constructor)
  }
}

class BadRequestError extends AppError {
  constructor(detail = '', errors = {}) {
    const message = reasonPhrases.BAD_REQUEST
    const status = statusCodes.BAD_REQUEST
    super(message, status, detail)
    this.errors = errors
  }
}

class NotFoundError extends AppError {
  constructor(detail = '') {
    const message = reasonPhrases.NOT_FOUND
    const status = statusCodes.NOT_FOUND
    super(message, status, detail)
  }
}

class InternalServerError extends AppError {
  constructor(detail = '') {
    const message = reasonPhrases.INTERNAL_SERVER_ERROR
    const status = statusCodes.INTERNAL_SERVER_ERROR
    super(message, status, detail)
  }
}

module.exports = {
  AppError,
  BadRequestError,
  InternalServerError,
  NotFoundError,
}
