const { app, BrowserWindow, ipcMain, dialog, protocol } = require('electron')
const { resolve } = require('app-root-path')
const dev = require('electron-is-dev')
const fs = require('fs')

const server = require('./server')

let win

async function createWindow() {
  try {
    // when starting the window run the server
    await server()
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
  })

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
  if (win === null) {
    createWindow()
  }
})

app.on('open-url', (event, string) => {
  event.preventDefault()
  fs.writeFileSync('~/test', 'utf8', string)
})

ipcMain.on('open-file', event => {
  const files = dialog.showOpenDialog({
    defaultPath: app.getPath('documents'),
    filters: [{ name: 'Markdown', extensions: ['md'] }],
    properties: ['openFile'],
  })

  if (!files || files.length === 0) return

  const fileName = files[0]

  if (
    !(fileName.lastIndexOf('.md') !== -1 && fileName.length - 3 === fileName.lastIndexOf('.md'))
  ) {
    return dialog.showErrorBox('Invalid file type', 'It must be a Markdown (.md) file')
  }

  fs.readFile(fileName, 'utf8', (error, content) => {
    if (error) return dialog.showErrorBox(error.message, error.stack)
    event.sender.send('file-opened', fileName, content)
  })
})

ipcMain.on('save-file', (event, content, _fileName) => {
  console.log(_fileName);
  let fileName =
    _fileName ||
    dialog.showSaveDialog({
      defaultPath: app.getPath('documents'),
      filters: [{ name: 'Markdown', extensions: ['md'] }, { name: 'All Files', extensions: ['*'] }],
      showsTagField: false,
    })

  if (!fileName) return

  if (
    !(fileName.lastIndexOf('.md') !== -1 && fileName.length - 3 === fileName.lastIndexOf('.md'))
  ) {
    fileName = fileName + '.md'
  }

  fs.writeFile(fileName, content, { encoding: 'utf8' }, error => {
    if (error) return dialog.showErrorBox(error.message, error.stack)
    event.sender.send('file-saved', fileName)
  })
})
