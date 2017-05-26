import { Component } from 'react'
import { Base } from 'pulse-editor/buttons'
import { ipcRenderer } from 'electron'
import { string, func } from 'prop-types'
import isMac from 'pulse-editor/built/utils/is-mac'
import Icon from 'react-icons/lib/fa/floppy-o'

export default class SaveButton extends Component {
  static contextTypes = {
    fileName: string,
    value: string.isRequired,
    setShortcut: func.isRequired,
    removeShortcut: func.isRequired,
    setFileName: func.isRequired
  }

  componentDidMount () {
    ipcRenderer.on('file-saved', this.handleSaved)
    ipcRenderer.on('trying-to-save', this.handleTryingToSave)
    this.context.setShortcut({
      ctrlKey: !isMac(),
      metaKey: isMac(),
      altKey: false,
      shiftKey: false,
      keyName: 's',
      updater: selected => selected,
      handler: event => {
        this.saveFile()
        return event.selection
      }
    })
  }

  componentWillUnmount () {
    ipcRenderer.removeListener('file-saved', this.handleSaved)
    ipcRenderer.removeListener('trying-to-save', this.handleTryingToSave)
    this.context.removeShortcut({ keyName: 's' })
  }

  saveFile = () => {
    if (this.context.value !== '') {
      ipcRenderer.send('save-file', this.context.value, this.context.fileName)
    }
  }

  handleClick = () => this.saveFile()

  handleSaved = (event, fileName) => {
    this.context.setFileName(fileName)
  }

  handleTryingToSave = event => {
    event.sender.send('content-to-save', this.context.value, this.context.fileName)
  }

  render = () => (
    <Base onClick={this.handleClick} name='save'>
      <span title='Save file [CMD+S]'>
        <Icon /> Save file
      </span>
    </Base>
  )
}
