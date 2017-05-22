const { app, BrowserWindow } = require('electron')
const { resolve } = require('app-root-path')
const dev = require('electron-is-dev')

const startServer = require('./server')
const setMenu = require('./menu')
const setIPCEvents = require('./ipc-events')

const windows = []

async function createWindow() {
  let win
  let server

  try {
    // when starting the window run the server
    server = await startServer()
  } catch (error) {
    console.error(error)
    app.exit(error)
  }

  // after the server starts create the electron browser window
  win = new BrowserWindow({
    title: 'Pulse',
    backgroundColor: '#058ecd',
    height: 768,
    width: 1024,
    center: true,
    show: false,
    webPreferences: {
      devTools: dev,
      textAreasAreResizable: false,
    },
  })

  windows.push(win)

  // open our server URL or the build directory in production
  win.loadURL(dev ? 'http://localhost:8000' : `file://${resolve('./build')}/index.html`)

  // in development open devtools
  if (dev) {
    win.webContents.openDevTools()
  }

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('close', () => {
    win = null
    const position = windows.indexOf(win)
    windows.splice(position, 1)
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

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (windows.length === 0) {
    createWindow()
  }
})

app.on('open-url', (event, string) => {
  event.preventDefault()
  fs.writeFileSync('~/test', 'utf8', string)
})
