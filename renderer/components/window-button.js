import { Component } from 'react'
import { Base } from 'pulse-editor/buttons'
import { ipcRenderer } from 'electron'
import { func } from 'prop-types'
import isMac from 'pulse-editor/built/utils/is-mac'
import Icon from 'react-icons/lib/fa/plus-circle'

export default class CreateButton extends Component {
  static contextTypes = {
    setShortcut: func.isRequired,
    removeShortcut: func.isRequired,
    writeValue: func.isRequired,
    setFileName: func.isRequired
  }

  componentDidMount () {
    ipcRenderer.on('shortcut-press', this.createWindow)
    this.context.setShortcut({
      ctrlKey: !isMac(),
      metaKey: isMac(),
      altKey: true,
      shiftKey: false,
      keyName: 'n',
      updater: selected => selected,
      handler: event => {
        this.createWindow()
        return event.selection
      }
    })
  }

  componentWillUnmount () {
    this.context.removeShortcut({ keyName: 'n' })
    ipcRenderer.removeListener('shortcut-press', this.createWindow)
  }

  createWindow = () => ipcRenderer.send('create-new-window')

  handleClick = () => this.createWindow()

  render = () => (
    <Base onClick={this.handleClick} name='open'>
      <span title='New Window [CMD+ALT+N]'>
        <Icon /> New Window
      </span>
    </Base>
  )
}
