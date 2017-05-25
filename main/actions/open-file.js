const { app, dialog } = require('electron')
const { readFile } = require('fs')

const openFile = (callback = () => {}) => {
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

  readFile(fileName, 'utf8', (error, content) => {
    if (error) return dialog.showErrorBox(error.message, error.stack)
    callback(fileName, content)
  })
}

module.exports = openFile
