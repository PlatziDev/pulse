import { Component } from 'react'
import { Base } from 'pulse-editor/buttons'
import { ipcRenderer } from 'electron'
import { string, func } from 'prop-types'
import Icon from 'react-icons/lib/fa/file-code-o'
import highlight from 'highlight.js'
import createParser from '@platzi/markdown'

const parser = createParser({
  highlight(code, lang) {
    if (lang && highlight.getLanguage(lang)) {
      return highlight.highlight(lang, code).value;
    }
    return highlight.highlightAuto(code).value;
  }
})

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
