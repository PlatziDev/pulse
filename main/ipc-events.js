const { app, ipcMain, dialog } = require('electron')
const fs = require('fs')
const exportedStyles = require('./exported-styles')

module.exports = () => {
  ipcMain.on('open-file', event => {
    const files = dialog.showOpenDialog({
      defaultPath: app.getPath('documents'),
      filters: [{ name: 'Markdown', extensions: ['md'] }],
      properties: ['openFile']
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
    let fileName =
      _fileName ||
      dialog.showSaveDialog({
        defaultPath: app.getPath('documents'),
        filters: [
          { name: 'Markdown', extensions: ['md'] },
          { name: 'All Files', extensions: ['*'] }
        ],
        showsTagField: false
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

  ipcMain.on('export-file', (event, content) => {
    let fileName = dialog.showSaveDialog({
      defaultPath: app.getPath('documents'),
      filters: [
        { name: 'Markdown', extensions: ['html'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      showsTagField: false
    })

    if (!fileName) return

    if (
      !(fileName.lastIndexOf('.html') !== -1 &&
        fileName.length - 3 === fileName.lastIndexOf('.html'))
    ) {
      fileName = fileName + '.html'
    }

    const finalContent = `
      <html>
        <style>${exportedStyles}</style>
        <body>
          ${content}
        </body>
      </html>
    `

    fs.writeFile(fileName, finalContent, { encoding: 'utf8' }, error => {
      if (error) return dialog.showErrorBox(error.message, error.stack)
      event.sender.send('file-exported', fileName)
    })
  })
}
