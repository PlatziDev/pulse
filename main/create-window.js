const { app, BrowserWindow } = require('electron')
const { resolve } = require('app-root-path')
const dev = require('electron-is-dev')

const startServer = require('./server')
const setMenu = require('./menu')
const setIPCEvents = require('./ipc-events')

async function createWindow () {
  let server

  try {
    // when starting the window run the server
    server = await startServer()
  } catch (error) {
    console.error(error)
    app.exit(error)
  }

  // after the server starts create the electron browser window
  global.win = new BrowserWindow({
    title: 'Pulse',
    backgroundColor: '#058ecd',
    height: 768,
    width: 1024,
    minHeight: 768,
    minWidth: 1024,
    center: true,
    show: false,
    webPreferences: {
      devTools: dev,
      textAreasAreResizable: false
    }
  })

  // open our server URL or the build directory in production
  global.win.loadURL(dev ? 'http://localhost:8000' : `file://${resolve('./build')}/index.html`)

  // in development open devtools
  if (dev) {
    global.win.webContents.openDevTools()
  }

  global.win.once('ready-to-show', () => {
    global.win.show()
  })

  global.win.on('close', () => {
    global.win = null
    if (server) server.close()
  })

  setIPCEvents()
  setMenu()

  // TODO: implement a way to get the Markdown data
  // protocol.registerHttpProtocol('pulse', (request, callback) => {
  //   const url = request.url.substr(8)
  //   console.log(url)
  // })
}

module.exports = createWindow
