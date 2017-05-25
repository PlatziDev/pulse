const { app, dialog } = require('electron')
const { writeFile } = require('fs')
const exportedStyles = require('./exported-styles');

const exportFile = (content, callback = () => {}) => {
  if (!content) throw new ReferenceError('The content is required.')

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

  writeFile(fileName, finalContent, { encoding: 'utf8' }, error => {
    if (error) return dialog.showErrorBox(error.message, error.stack)
    callback(fileName)
  })
}

module.exports = exportFile
