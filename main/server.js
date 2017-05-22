const { app } = require('electron')
const { createServer } = require('http')
const next = require('next')

const dev = require('electron-is-dev')

module.exports = async () => {
  // if it's development, then start a HTTP server with Next as handler
  // using the renderer directory in the port 8000
  if (dev) {
    const { resolve } = require('app-root-path')
    const dir = resolve('./renderer')

    const next = require('next')
    const nextApp = next({ dev, dir })
    const nextHandler = nextApp.getRequestHandler()

    try {
      await nextApp.prepare()
    } catch (error) {
      return Promise.reject(error)
    }

    const server = createServer(nextHandler)

    server.listen(8000, () => {
      app.on('before-quit', () => server.close())
    })

    return server
  }

  // in production resolve the promise as empty
  return Promise.resolve()
}
