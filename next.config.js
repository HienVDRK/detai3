const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  serverRuntimeConfig: {
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
    APIKEY: process.env.APIKEY
  }
}
