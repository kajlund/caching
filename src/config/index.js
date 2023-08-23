const dotenv = require('dotenv')

// Load environment variables BEFORE setting up config
dotenv.config()

const ENV = process.env.NODE_ENV || 'development'
const envConfig = require(`./${ENV}`)

const baseConfig = {
  port: parseInt(process.env.PORT) || 3000,
  nodeEnv: ENV,
  log: {
    level: 'debug',
  },
}

const config = { ...baseConfig, ...envConfig }

module.exports = config
