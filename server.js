const express = require('express')
const next = require('next')
const port = 3300
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/detail/:idFilm', (req, res) => {
      app.render(req, res, '/detail', { idFilm: req.params.idFilm })
    })
    server.get('/bookmark', (req, res) => {
      return app.render(req, res, '/bookmark')
    })

    server.get('/search', (req, res) => {
      return app.render(req, res, '/search')
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) {
        throw err
      }
      console.warn(`Ready on http://localhost:${port}`)
    })
  }).catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
