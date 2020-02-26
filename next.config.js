require('dotenv').config()

module.exports = {
  serverRuntimeConfig: {
    KEY: process.env.KEY
  },
  publicRuntimeConfig: {
    staticFolder: '/static'
  }
}
