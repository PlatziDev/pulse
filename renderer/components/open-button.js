import { Component } from 'react'
import { Base } from 'pulse-editor/buttons'
import { ipcRenderer } from 'electron'
import { string, func } from 'prop-types'
import isMac from 'pulse-editor/built/utils/is-mac'
import Icon from 'react-icons/lib/fa/folder-open-o'

export default class OpenButton extends Component {
  static contextTypes = {
    setShortcut: func.isRequired,
    removeShortcut: func.isRequired,
    writeValue: func.isRequired,
    setFileName: func.isRequired,
  }

  componentDidMount() {
    ipcRenderer.on('file-opened', this.handleOpen)
    this.context.setShortcut({
      ctrlKey: !isMac(),
      metaKey: isMac(),
      altKey: false,
      shiftKey: false,
      keyName: 'o',
      updater: selected => selected,
      handler: event => {
        this.openFile()
        return event.selection
      },
    })
  }

  componentWillUnmount() {
    this.context.removeShortcut({ keyName: 'o' })
    ipcRenderer.removeListener('file-opened', this.handleOpen)
  }

  openFile = () => ipcRenderer.send('open-file')

  handleClick = () => this.openFile()

  handleOpen = (event, fileName, content) => {
    this.context.setFileName(fileName)
    this.context.writeValue({ target: { value: content } })
  }

  render = () => (
    <Base onClick={this.handleClick} name="open">
      <span title="Open file [CMD+O]">
        <Icon /> Open file
      </span>
    </Base>
  )
}
