const { BrowserWindow } = require('electron')
const { resolve } = require('app-root-path')
const dev = require('electron-is-dev')

const setMenu = require('../menu')

async function createWindow (_windows) {
  // after the server starts create the electron browser window
  let win = new BrowserWindow({
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
  const id = win.id

  // open our server URL or the build directory in production
  win.loadURL(dev ? 'http://localhost:8000' : `file://${resolve('./build')}/index.html`)

  // in development open devtools
  if (dev) {
    win.webContents.openDevTools()
  }

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('closed', () => {
    _windows.delete(id)
  })

  setMenu()

  // TODO: implement a way to get the Markdown data
  // protocol.registerHttpProtocol('pulse', (request, callback) => {
  //   const url = request.url.substr(8)
  //   console.log(url)
  // })
  _windows.set(id, win)
  return win
}

module.exports = createWindow
