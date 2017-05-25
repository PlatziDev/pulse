const { app, dialog } = require('electron')
const { writeFile } = require('fs')

const saveFile = (content, _fileName = '', callback = () => {}) => {
  if (!content) throw new ReferenceError('The content is required.')

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

  writeFile(fileName, content, { encoding: 'utf8' }, error => {
    if (error) return dialog.showErrorBox(error.message, error.stack)
    callback(fileName)
  })
}

module.exports = saveFile
