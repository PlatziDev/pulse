const { app, Menu, shell, webContents, ipcMain } = require('electron')
const openFile = require('./actions/open-file')
const saveFile = require('./actions/save-file')

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New file',
        accelerator: 'CmdOrCtrl+N',
        click () {
          const webContent = webContents.getFocusedWebContents()
          if (webContent) {
            webContent.send('new-file')
          }
        }
      },
      {
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        click () {
          const webContent = webContents.getFocusedWebContents()
          if (webContent) {
            openFile(webContent.send.bind(webContent, 'file-opened'))
          }
        }
      },
      {
        label: 'Save file',
        accelerator: 'CmdOrCtrl+S',
        click() {
          const webContent = webContents.getFocusedWebContents()
          if (webContent) {
            webContent.send('trying-to-save')
            ipcMain.once('content-to-save', (event, content, fileName) => {
              saveFile(content, fileName, webContent.send.bind(webContent, 'file-saved'))
            })
          }
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [{ role: 'minimize' }, { role: 'close' }]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: () => shell.openExternal('https://platzi.com')
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })

  // Edit menu
  template[1].submenu.push(
    { type: 'separator' },
    {
      label: 'Speech',
      submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
    }
  )

  // Window menu
  template[3].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' }
  ]
}

const menu = Menu.buildFromTemplate(template)

module.exports = () => Menu.setApplicationMenu(menu)
