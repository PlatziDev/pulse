import { Component } from 'react'
import { Base } from 'pulse-editor/buttons'
import { string, func } from 'prop-types'
import isMac from 'pulse-editor/built/utils/is-mac'

import Icon from './icon'

export default class NewButton extends Component {
  static contextTypes = {
    setShortcut: func.isRequired,
    setFileName: func.isRequired,
    removeShortcut: func.isRequired,
    writeValue: func.isRequired,
  }

  componentDidMount() {
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
      },
    })
  }

  componentWillUnmount() {
    this.context.removeShortcut({ keyName: 'o' })
  }

  createFile = () => {
    this.context.setFileName(undefined)
    this.context.writeValue({ target: { value: '' } })
  }

  handleClick = () => this.createFile()

  render = () => (
    <Base onClick={this.handleClick} name="new">
      <span>
        <Icon name="file-o" title="New file [CMD+N]" /> New file
      </span>
    </Base>
  )
}
