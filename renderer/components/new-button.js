import { Component } from 'react'
import { Base } from 'pulse-editor/buttons'
import { ipcRenderer } from 'electron'
import { func } from 'prop-types'
import isMac from 'pulse-editor/built/utils/is-mac'
import Icon from 'react-icons/lib/fa/file-o'

export default class NewButton extends Component {
  static contextTypes = {
    setShortcut: func.isRequired,
    setFileName: func.isRequired,
    removeShortcut: func.isRequired,
    writeValue: func.isRequired
  }

  componentDidMount () {
    ipcRenderer.on('new-file', this.createFile)
    this.context.setShortcut({
      ctrlKey: !isMac(),
      metaKey: isMac(),
      altKey: false,
      shiftKey: false,
      keyName: 'n',
      updater: selected => selected,
      handler: event => {
        this.createFile()
        return event.selection
      }
    })
  }

  componentWillUnmount () {
    ipcRenderer.removeListener('new-file', this.createFile)
    this.context.removeShortcut({ keyName: 'o' })
  }

  createFile = () => {
    this.context.setFileName(undefined)
    this.context.writeValue({ target: { value: '' } })
  }

  handleClick = () => this.createFile()

  render = () => (
    <Base onClick={this.handleClick} name='new'>
      <span title='New file [CMD+N]'>
        <Icon /> New file
      </span>
    </Base>
  )
}
