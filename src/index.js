require('express-async-errors')
const express = require('express')

const cnf = require('./config')
const logger = require('./utils/logger')
const { reasonPhrases, statusCodes } = require('./utils/statuscodes')
const { AppError } = require('./utils/errors')
// express

const app = express()

// rest of the packages
const cors = require('cors')

// database

//  routers
app.get('/ping', (req, res) => {
  res.status(200).send('Pong')
})

// middleware
app.set('trust proxy', 1)
app.use(cors())
app.use(express.json())
app.use(express.static('./public'))

// Handle 404
app.use((req, res) => res.status(statusCodes.NOT_FOUND).send(reasonPhrases.NOT_FOUND))

// Error handler
app.use((err, req, res, _next) => {
  logger.error(err)
  const error = {
    statusCode: err.status || err.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
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

// Start server
const start = async () => {
  try {
    app.listen(cnf.port, () => logger.info(`Server is listening on port ${cnf.port}...`))
  } catch (err) {
    logger.error(err)
  }
}

start()
