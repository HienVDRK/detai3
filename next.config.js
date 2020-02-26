require('dotenv').config()

module.exports = {
  serverRuntimeConfig: {
    NAME: 'HIEN',
    KEY: process.env.KEY
  },
  publicRuntimeConfig: {
    staticFolder: '/static'
  }
}
