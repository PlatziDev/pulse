const WindowManager = require('./window-manager')
const { app } = require('electron')
//  Imgur API needs a clientId
global.clientId = process.env.IMGUR_CLIENT_ID
const dev = require('electron-is-dev')
const startServer = require('./server')
const setIPCEvents = require('./ipc-events')

class Main {
  constructor () {
    this.server = null
    this._windowManager = new WindowManager()
  }
  get windowManager () {
    return this._windowManager
  }

  async onReady () {
    if (dev) {
      try {
        this.server = await startServer()
      } catch (error) {
        console.error(error)
        app.exit(error)
      }
    }
    this._windowManager.createNewWindow()
  }

  onWindowAllClosed () {
    app.quit()
  }
}
const main = new Main()

app.once('ready', () => {
  main.onReady()
  setIPCEvents()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    main.onWindowAllClosed()
  }
  if (this.server) this.server.close()
})
