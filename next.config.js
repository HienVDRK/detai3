const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  serverRuntimeConfig: {
    APIKEY: process.env.APIKEY,
    API_KEY_YT: process.env.API_KEY_YT
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
    APIKEY: process.env.APIKEY,
    API_KEY_YT: process.env.API_KEY_YT
  }
}
