import { Component } from 'react'
import { Base } from 'pulse-editor/buttons'
import { ipcRenderer } from 'electron'
import { string, func } from 'prop-types'
import Icon from 'react-icons/lib/fa/file-code-o'
import createParser from '@platzi/markdown'

const parser = createParser()

export default class NewButton extends Component {
  static contextTypes = {
    writeValue: func.isRequired,
    value: string.isRequired
  }

  exportFile = () => ipcRenderer.send('export-file', parser(this.context.value))

  handleClick = () => this.exportFile()

  render = () => (
    <Base name='export' onClick={this.handleClick}>
      <span title='Export HTML'>
        <Icon /> Export
      </span>
    </Base>
  )
}
