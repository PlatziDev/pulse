import { Component } from 'react'
import { ipcRenderer, shell } from 'electron'
import { string, func, bool } from 'prop-types'
import { Editor, ButtonGroup, ButtonBar, Field, Preview, EmojiBar } from 'pulse-editor'
import {
  Bold,
  Italic,
  Underline,
  Code,
  Link,
  Image,
  OrderedList,
  UnorderedList,
  Quote,
  Heading,
  Youtube,
} from 'pulse-editor/buttons'

import Save from '../components/save-button'
import Open from '../components/open-button'
import New from '../components/new-button'

import BoldIcon from 'react-icons/lib/fa/bold'
import ItalicIcon from 'react-icons/lib/fa/italic'
import UnderlineIcon from 'react-icons/lib/fa/underline'
import CodeIcon from 'react-icons/lib/fa/code'
import LinkIcon from 'react-icons/lib/fa/external-link'
import ImageIcon from 'react-icons/lib/fa/image'
import OLIcon from 'react-icons/lib/fa/list-ol'
import ULIcon from 'react-icons/lib/fa/list-ul'
import QuoteIcon from 'react-icons/lib/fa/quote-left'
import HeadingIcon from 'react-icons/lib/fa/header'
import YoutubeIcon from 'react-icons/lib/fa/youtube-play'

const mockFn = () => {}

export default class extends Component {
  static childContextTypes = {
    fileName: string,
    setFileName: func.isRequired,
  }

  state = {
    fileName: undefined,
  }

  getChildContext() {
    return {
      fileName: this.state.fileName,
      setFileName: this.setFileName,
    }
  }

  componentDidMount() {
    this.$preview = document.querySelector('.PulseEditor-preview')
    this.$preview.addEventListener('click', this.handlePreviewLinkClick)
  }

  componentWillUnmount() {
    this.$preview.removeEventListener('click', this.handlePreviewLinkClick)
  }

  setFileName = fileName => this.setState({ fileName })

  handleDrop = event => event.preventDefault()

  handlePreviewLinkClick = event => {
    if (event.target.nodeName === 'A') {
      event.preventDefault()
      shell.openExternal(event.target.getAttribute('href'))
    }
  }

  setRef = editor => {
    this.editor = editor
  }

  render() {
    return (
      <Editor
        editorRef={this.setRef}
        onDrop={this.handleDrop}
        name="main-editor"
      >
        <ButtonBar>
          <ButtonGroup>
            <Bold>
              <span title="Bold [CMD+B]"><BoldIcon /></span>
            </Bold>
            <Italic>
              <span title="Italic [CMD+I]">
                <ItalicIcon />
              </span>
            </Italic>
            <Underline>
              <span title="Underline [CMD+U]">
                <UnderlineIcon />
              </span>
            </Underline>
            <Code>
              <span title="Insert code"><CodeIcon /> Insert code</span>
            </Code>
            <Link>
              <span title="Insert link [CDM+K]"><LinkIcon /> Link</span>
            </Link>
            <Image>
              <span title="Insert image"><ImageIcon /> Image</span>
            </Image>
            <OrderedList>
              <span title="Ordered List">
                <OLIcon />
              </span>
            </OrderedList>
            <UnorderedList>
              <span title="Unordered list [CMD+L]">
                <ULIcon />
              </span>
            </UnorderedList>
            <Quote>
              <span title="Quote [CMD+Q]">
                <QuoteIcon />
              </span>
            </Quote>
            <Heading>
              <span title="Heading [CMD+H]">
                <HeadingIcon />
              </span>
            </Heading>
            <Youtube>
              <span title="Youtube video">
                <YoutubeIcon />
              </span>
            </Youtube>
          </ButtonGroup>

          <ButtonGroup>
            <New />
            <Open />
            <Save />
          </ButtonGroup>
        </ButtonBar>

        <div className="PulseEditor-content">
          <Field />
          <Preview />
        </div>

        <EmojiBar />

        <style jsx global>{`
          .PulseEditor {
            display: flex;
            flex-wrap: wrap;
            min-height: 100vh;
            max-height: 100vh;
            box-sizing: border-box;
          }
          .PulseEditor-content {
            /*border: 1px solid #058ecd;*/
            display: flex;
            flex: 1;
            position: relative;
          }
          .PulseEditor-field,
          .PulseEditor-preview {
            border: none;
            /*border-radius: 0 0 5px 5px;*/
            box-sizing: border-box;
            font-family: Arial;
            font-size: 16px;
            line-height: 1.5;
            padding: 1em;
            flex: 1;
            width: 50vw;
          }
          .PulseEditor-field {
            box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.2);
            border-right: 1px solid #058ecd;
            min-height: calc(100vh - 48px);
            resize: none;
          }
          .PulseEditor-field:focus {
            outline: none;
          }
          .PulseEditor-field:disabled {
            background-color: #4F4F4F;
            cursor: wait;
          }
          .PulseEditor-preview {
            background-color: #fff;
            margin-bottom: 0 !important;
            max-height: calc(100vh - 48px);
            overflow-y: auto !important;
          }
          .PulseEditor-buttonBar {
            background-color: #058ecd;
            box-sizing: border-box;
            color: #fff;
            display: flex;
            justify-content: space-between;
            padding: .5em;
            width: 100%;
          }
          .PulseEditor-buttonGroup {
            border: 1px solid #7dc2e1;
            border-radius: 5px;
            display: flex;
            margin: 0 .5em;
          }
          .PulseEditor-buttonGroup:first-of-type {
            margin-left: 0;
          }
          .PulseEditor-buttonGroup:last-of-type {
            margin-right: 0;
          }
          .PulseEditor-button {
            background: none;
            border: none;
            border-right: 1px solid #7dc2e1;
            box-sizing: border-box;
            color: #fff;
            cursor: pointer;
            font-size: 16px;
            min-width: 37px;
            min-height: 30px;
            text-align: center;
            transition: all 0.2s;
            padding: 0;
          }
          .PulseEditor-button:last-of-type,
          .PulseEditor-button:last-of-type span {
            margin-right: 0;
          }
          .PulseEditor-button + .PulseEditor-button {
            border-left: none;
          }
          .PulseEditor-button:hover {
            background-color: #fff;
            color: #058ecd;
          }
          .PulseEditor-button:focus {
            outline: none;
          }
          .PulseEditor-button > * {
            box-sizing: border-box;
            display: block;
            min-width: 1.75em;
            padding: 0 0.5em;
          }
          .PulseEditor-button .bold {
            font-weight: bold;
          }
          .PulseEditor-button .italic {
            font-style: italic;
          }
          .PulseEditor-button .underline {
            text-decoration: underline;
          }
          .PulseEditor-button [class^="icon-"] {
            margin-right: 0.25em;
          }
          .PulseEditor-emojiBar {
            background-color: #fff;
            border: 1px solid #058ecd;
            border-top: none;
            border-radius: 0 0 0.25em 0.25em;
            padding: 0.25em 0;
            margin: 0 auto;
            width: calc(100% - 0.5em);
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
          }
          .PulseEditor-emojiItem {
            background: none;
            border: none;
            border-radius: 0.5em;
            cursor: pointer;
            margin: 0 0.25em;
          }
          .PulseEditor-emojiItem:hover {
            background-color: #058ecd;
            color: #fff;
          }

          .u-videoWrapper,
          .PulseEditor-preview .embed-responsive {
            position: relative;
            padding-bottom: 56.25% /* 16:9 */;
            height: 0;
          }
          .u-videoSource,
          .PulseEditor-preview .embed-responsive iframe {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }
          .PulseEditor-preview {
            box-sizing: border-box;
            overflow-x: auto;
            margin-bottom: 0.5rem;
            word-break: break-all;
            word-break: break-word;
            line-height: 1.5;
            -webkit-line-clamp: 10;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .PulseEditor-preview.isExpanded {
            max-height: none;
            display: block;
            overflow: visible;
          }
          .PulseEditor-preview :first-child {
            margin-top: 0.2em;
          }
          .PulseEditor-preview :first-child:not(p) {
            margin-top: 0.5em;
          }
          .PulseEditor-preview :last-child {
            margin-bottom: 0;
          }
          .PulseEditor-preview h1,
          .PulseEditor-preview h2,
          .PulseEditor-preview h3,
          .PulseEditor-preview h4,
          .PulseEditor-preview h5,
          .PulseEditor-preview h6,
          .PulseEditor-preview p,
          .PulseEditor-preview ul,
          .PulseEditor-preview ol,
          .PulseEditor-preview figure,
          .PulseEditor-preview div {
            margin: 1em 0;
          }
          .PulseEditor-preview h1:empty,
          .PulseEditor-preview h2:empty,
          .PulseEditor-preview h3:empty,
          .PulseEditor-preview h4:empty,
          .PulseEditor-preview h5:empty,
          .PulseEditor-preview h6:empty,
          .PulseEditor-preview p:empty,
          .PulseEditor-preview ul:empty,
          .PulseEditor-preview ol:empty,
          .PulseEditor-preview figure:empty,
          .PulseEditor-preview div:empty {
            display: none;
          }
          .PulseEditor-preview figure {
            text-align: center;
          }
          .PulseEditor-preview img {
            max-width: 100%;
          }
          .PulseEditor-preview ul,
          .PulseEditor-preview ol,
          .PulseEditor-preview dd {
            padding-left: 1.5em;
          }
          .PulseEditor-preview dt {
            font-weight: bold;
          }
          .PulseEditor-preview .video-wrapper {
            max-width: 480px;
          }
          .PulseEditor-preview .task-list {
            list-style-type: none;
          }
          .PulseEditor-preview .task-list padding-left .5em input[type="checkbox"] {
            margin-right: 0.5em;
          }
          .PulseEditor-preview blockquote {
            border-left: 0.6em solid #dfe1e3;
            padding: 0.125em 1.6em;
          }
          .PulseEditor-preview table {
            width: 100%;
          }
          .PulseEditor-preview table thead,
          .PulseEditor-preview table tr:nth-child(even) {
            background-color: rgba(0,0,0,0.25);
          }
          .PulseEditor-preview table td,
          .PulseEditor-preview table th {
            padding: 0.25em 0.5em;
          }
          .PulseEditor-preview abbr {
            cursor: help;
            text-decoration: underline;
            text-decoration-style: dotted;
          }
          .PulseEditor-preview pre {
            white-space: pre-wrap;
            background-color: #272822;
            border: none;
            box-sizing: border-box;
            color: #ddd;
            font-family: monospace;
            font-size: 1rem;
            line-height: 1.25;
            width: 100%;
            padding: 0 !important;
          }
          .PulseEditor-preview pre code {
            display: block;
            padding: 0.7em;
            tab-size: 2;
          }
          .PulseEditor-preview pre code[class="language-javascript"],
          .PulseEditor-preview pre code[class="language-js"],
          .PulseEditor-preview pre code[class="language-html"],
          .PulseEditor-preview pre code[class="language-css"],
          .PulseEditor-preview pre code[class="language-styl"],
          .PulseEditor-preview pre code[class="language-saas"],
          .PulseEditor-preview pre code[class="language-less"],
          .PulseEditor-preview pre code[class="language-ruby"] {
            tab-size: 2;
          }
          .PulseEditor-preview pre code[class="language-java"],
          .PulseEditor-preview pre code[class="language-python"],
          .PulseEditor-preview pre code[class="language-php"] {
            tab-size: 4;
          }
          .PulseEditor-preview pre code[class="language-go"] {
            tab-size: 8;
          }
          .PulseEditor-preview mark,
          .PulseEditor-preview code {
            font-size: 13px;
            max-width: 100%;
            box-sizing: border-box;
            font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
            padding: 0.2rem;
            width: 100%;
          }
          .PulseEditor-preview code {
            background-color: rgba(0,0,0,0.05);
          }
          .PulseEditor-preview mark {
            background-color: #058ecd;
            color: #fff;
          }
        `}</style>
      </Editor>
    )
  }
}
