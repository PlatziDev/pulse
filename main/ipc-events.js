const { ipcMain } = require('electron')

const exportFile = require('./actions/export-file')
const openFile = require('./actions/open-file')
const saveFile = require('./actions/save-file')

module.exports = () => {
  ipcMain.on('open-file', event => {
    openFile(event.sender.send.bind(event.sender, 'file-opened'))
  })

  ipcMain.on('save-file', (event, content, fileName) => {
    saveFile(content, fileName, event.sender.send.bind(event.sender, 'file-saved'))
  })

  ipcMain.on('export-file', (event, content) => {
    exportFile(content, event.sender.send.bind(event.sender, 'file-exported'))
  })
}
