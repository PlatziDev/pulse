import { remote } from 'electron'

//  validate file format with a list of format supports imgur
let validateFile = (file) => {
  let imageFormat = ['jpeg', 'png', 'gif', 'peg', 'apng', 'tiff', 'pdf', 'xcf']
  return imageFormat.filter((kind) => {
    let res = new RegExp("\\b(" + kind + ")\\b")
    return res.test(file.type)
  })
}

//  send file via XMLHTTP
let sendData = (_this, file) => {
  let fd = new FormData()
  fd.append('image', file)
  let xhttp = new XMLHttpRequest()
  xhttp.open('POST', 'https://api.imgur.com/3/image', true)
  xhttp.setRequestHeader('Authorization', `Client-ID ${remote.getGlobal('clientId')}`)
  xhttp.onreadystatechange = function () {
    let response = ''
    let event = {}
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 300) {
        try {
          response = JSON.parse(this.responseText)
        } catch (err) {
          response = this.responseText;
        }
        event.target = {
          value: `${_this.editor.domField.value} ![${file.name}](${response.data.link})`
        }
        //  write response on editor
        _this.editor.writeValue(event)
      } else {
        throw new Error(this.status + " - " + this.statusText)
      }
    }
  }
  xhttp.send(fd)
  xhttp = null
}

let imageDrop = (e, _this) => {
  // without 'preventDefault', when you drop the image, change the whole editor view
  e.preventDefault()
  let event = {}
  let file = e.dataTransfer.files[0]
  let valido = validateFile(file)
  if (!!valido && valido.length !== 0) {
    sendData(_this, file)
  } else {
    event.target = {
      value: `${_this.editor.domField.value} ![Problem with the format file](url)`
    }
    // if file format doesn't support by imgur, advice the user
    _this.editor.writeValue(event)
  }
}
export default  imageDrop