const { ipcMain, BrowserWindow } = require('electron')
const createWindow = require('./actions/create-window')

class WindowManager {
  constructor () {
    this._windows = new Map()
    ipcMain.on('create-new-window', this._onRequestCreateNewWindow.bind(this))
  }

  reload () {
    const w = BrowserWindow.getFocusedWindow()
    if (w) {
      w.reload()
    }
  }

  createNewWindow (value = '', fileName = undefined) {
    createWindow(this._windows, value, fileName)
  }

  _onRequestCreateNewWindow (event) {
    this.createNewWindow()
    event.sender.send('created-new-window')
  }
}

module.exports = WindowManager
