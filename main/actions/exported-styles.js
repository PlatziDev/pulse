module.exports = `
body {
  font-family: Arial;
  font-size: 16px;
  line-height: 1.5;
  max-width: 1000px;
  margin: 0 auto 3em;
}
.u-videoWrapper,
body .embed-responsive {
  position: relative;
  padding-bottom: 56.25% /* 16:9 */;
  height: 0;
}
.u-videoSource,
body .embed-responsive iframe {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
body :first-child {
  margin-top: 0.2em;
}
body :first-child:not(p) {
  margin-top: 0.5em;
}
body :last-child {
  margin-bottom: 0;
}
body a {
  text-decoration: underline;
  color: #0a8ecd;
  cursor: pointer;
}
body h1,
body h2,
body h3,
body h4,
body h5,
body h6,
body p,
body ul,
body ol,
body figure,
body div {
  margin: 1em 0;
}
body h1:empty,
body h2:empty,
body h3:empty,
body h4:empty,
body h5:empty,
body h6:empty,
body p:empty,
body ul:empty,
body ol:empty,
body figure:empty,
body div:empty {
  display: none;
}
body figure {
  text-align: center;
}
body img {
  max-width: 100%;
}
body ul,
body ol,
body dd {
  padding-left: 1.5em;
}
body dt {
  font-weight: bold;
}
body .video-wrapper {
  max-width: 480px;
}
body .task-list {
  list-style-type: none;
}
body .task-list padding-left .5em input[type="checkbox"] {
  margin-right: 0.5em;
}
body blockquote {
  border-left: 0.6em solid #dfe1e3;
  padding: 0.125em 1.6em;
}
body table {
  width: 100%;
}
body table thead,
body table tr:nth-child(even) {
  background-color: rgba(0,0,0,0.25);
}
body table td,
body table th {
  padding: 0.25em 0.5em;
}
body abbr {
  cursor: help;
  text-decoration: underline;
  text-decoration-style: dotted;
}
body pre {
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
body pre code {
  display: block;
  padding: 0.7em;
  tab-size: 2;
}
body pre code[class="language-javascript"],
body pre code[class="language-js"],
body pre code[class="language-html"],
body pre code[class="language-css"],
body pre code[class="language-styl"],
body pre code[class="language-saas"],
body pre code[class="language-less"],
body pre code[class="language-ruby"] {
  tab-size: 2;
}
body pre code[class="language-java"],
body pre code[class="language-python"],
body pre code[class="language-php"] {
  tab-size: 4;
}
body pre code[class="language-go"] {
  tab-size: 8;
}
body mark,
body code {
  font-size: 13px;
  max-width: 100%;
  box-sizing: border-box;
  font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
  padding: 0.2rem;
  width: 100%;
}
body code {
  background-color: rgba(0,0,0,0.05);
}
body mark {
  background-color: #058ecd;
  color: #fff;
}
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #272822;
  color: #ddd
}
.hljs-tag,
.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-strong,
.hljs-name {
  color: #f92672
}
.hljs-code {
  color: #66d9ef
}
.hljs-class .hljs-title {
  color: white
}
.hljs-attribute,
.hljs-symbol,
.hljs-regexp,
.hljs-link {
  color: #bf79db
}
.hljs-string,
.hljs-bullet,
.hljs-subst,
.hljs-title,
.hljs-section,
.hljs-emphasis,
.hljs-type,
.hljs-built_in,
.hljs-builtin-name,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-addition,
.hljs-variable,
.hljs-template-tag,
.hljs-template-variable {
  color: #a6e22e
}
.hljs-comment,
.hljs-quote,
.hljs-deletion,
.hljs-meta {
  color: #75715e
}
.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-doctag,
.hljs-title,
.hljs-section,
.hljs-type,
.hljs-selector-id {
  font-weight: bold
}
`
