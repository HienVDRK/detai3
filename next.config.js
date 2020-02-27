const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  serverRuntimeConfig: {
    KEY: process.env.KEY
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
    APIKEY: process.env.APIKEY
  }
}
