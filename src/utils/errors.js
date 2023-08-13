const { reasonPhrases, statusCodes } = require('./statuscodes')

class AppError extends Error {
  constructor(message = reasonPhrases.INTERNAL_SERVER_ERROR, status = statusCodes.INTERNAL_SERVER_ERROR, detail = '') {
    super(message)
    this.status = status
    this.name = this.constructor.name
    this.detail = detail
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  AppError,
}
