const { app } = require('electron')

const createWindow = require('./create-window')

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!global.win) {
    createWindow()
  }
})
