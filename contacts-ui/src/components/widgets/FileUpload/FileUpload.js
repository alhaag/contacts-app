// third party
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
import Avatar from 'react-md/lib/Avatars/Avatar'
import List from 'react-md/lib/Lists/List'
import ListItem from 'react-md/lib/Lists/ListItem'
import superagent from 'superagent'
import Dropzone from 'react-dropzone'
// components
import { FileUploadIcon, DeleteIcon, InsertDriveFileIcon } from 'components/icons/IconSet'
// styles
import 'styles/widgets/file-upload.scss'


class FileUpload extends Component {

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    errorText: PropTypes.string,
    urlUpload: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onError: PropTypes.func,
    onProgress: PropTypes.func,
    onFinish: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
  }

  constructor() {
    super()
    this.req = null
    this.state = {
      completed: 0,
      accept: '',
      files: [],
    }
  }

  handleDrop(newFiles) {
    let { files } = this.state
    // descarta existentes
    let uniqueNewFiles = newFiles.filter(item => {
      let hasName = false
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.name == item.name){
          hasName = true
        }
      }
      return ! hasName
    })
    if (uniqueNewFiles.length === 0) return
    this.setState(({ files }) => ({
      files: files.concat(uniqueNewFiles)
    }), () => this.handleChange())
  }

  handleRemove(fileName) {
    let { files } = this.state
    let newFiles = files.filter(file => {
      return file.name != fileName
    })
    this.setState({ files: newFiles }, () => this.handleChange())
  }

  /**
   * Inicia o upload.
   *
   * @public
   */
  startUpload = () => {
    this.setState({ completed: 0 })

    let { files } = this.state

    if (files.length === 0) {
      this.handleFinish()
      return
    }

    var data = new FormData()

    files.forEach(file => {
      data.append("files[]", file, file.name)
    })

    this.req = superagent.post(this.props.urlUpload).timeout({
      response: 60 * 60 * 1000,  // Wait seconds for the server to start sending,
      deadline: 60 * 60 * 1000, // but allow for the file to finish loading.
    })

    this.req.on('progress', event => {
      if (isNaN(event.percent)) return
      var percent = Math.floor(event.percent)
      if (percent >= 100) {
        this.setState({ completed: 100 })
      } else {
        this.setState({ completed: percent })
      }
      this.props.onProgress(percent)
    })

    this.req.send(data)

    this.req.end((err, res) => {
      if (err) {
        this.handleError(err, res)
      } else {
        this.handleFinish(res)
      }
      this.req = null
    })
  }

  /**
   * Cancela upload em andamento.
   *
   * @public
   */
  abortlUpload() {
    if (this.req !== null){
      this.req.abort()
    }
  }

  handleChange() {
    let { files } = this.state
    this.props.onChange(files)
  }

  handleError(err, res) {
    this.props.onError(err, res)
  }

  handleFinish(res) {
    this.setState({
      files: [],
      completed: 0,
    })
    this.props.onFinish(res)
  }

  render() {
    const { files } = this.state
    const { label, required, disabled, className, error, errorText, multiple = true } = this.props

    let wrapperClassName = 'FileUpload-root'

    if (className) {
      wrapperClassName += ` ${className}`
    }
    if (error) {
      wrapperClassName += ' has-error'
    }

    return (
      <div className={wrapperClassName}>
        <div className="md-grid">
          { label ? <label className="FileUpload-label md-cell md-cell--12">{label}{required ? ' *': ''}</label> : '' }
            <Dropzone
              className="md-cell md-cell--12"
              style={{
                width: '100%',
                height: 'auto',
                borderWidth: '2px',
                borderColor: '#ccc',
                borderStyle: 'dashed',
                borderRadius: '5px',
                textAlign: 'center',
                padding: '15px'
              }}
              disabled={disabled}
              // accept={accept}
              onDrop={this.handleDrop.bind(this)}
            >
              <div>
                <FileUploadIcon/>
                <p>Arraste os arquivos aqui</p>
                <Button
                  raised
                  disabled={disabled}
                >
                  Ou clique para selecionar
                </Button>
              </div>
            </Dropzone>
          <List className="md-cell md-cell--12">
            {
              files.map(f =>
                <ListItem
                  key={f.name}
                  leftAvatar={<Avatar icon={<InsertDriveFileIcon />} />}
                  primaryText={f.name}
                  secondaryText={<span>{f.size} bytes</span>}
                  rightIcon={
                    <DeleteIcon
                      disabled={disabled}
                      onClick={() => (disabled) ? {} : this.handleRemove(f.name)}
                    />
                  }
                />
              )
            }
          </List>
        </div>
        { errorText ? <label className="FileUpload-label md-cell md-cell--12">{errorText}</label> : null }
      </div>
    )
  }
}

export default FileUpload
