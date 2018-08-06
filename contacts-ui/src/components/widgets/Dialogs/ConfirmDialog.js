/**
 * Dialogo de confirmação.
 */

// third party
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DialogContainer from 'react-md/lib/Dialogs/DialogContainer'


class ConfirmDialog extends Component {

  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    labelOk: PropTypes.string,
    labelCancel: PropTypes.string,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    labelOk: 'Ok',
    labelCancel: 'Cancelar',
    onCancel: function () {}
  }

  constructor(props) {
    super()
    this.state = {
      visibleDialog: false,
      idEspecialidade: '',
      labelEspecialidade: ''
    }
  }

  /**
   * @public
   */
  open = () => {
    this.setState({ visibleDialog: true })
  }

  handleHideDialog = () => {
    this.setState({ visibleDialog: false })
  }

  handleOk = () => {
    this.handleHideDialog()
    this.props.onOk()
  }

  handleCancel = () => {
    this.handleHideDialog()
    this.props.onCancel()
  }

  render() {
    let { visibleDialog } = this.state
    let { title, message, labelOk, labelCancel } = this.props


    return(
      <DialogContainer
        id="scrolling-content-dialog"
        aria-describedby="scrolling-content-dialog-content"
        visible={visibleDialog}
        title={title}
        onHide={() => {}}
        width={500}
        actions={[
          {
            onClick: this.handleCancel,
            primary: true,
            children: labelCancel,
          }, {
            onClick: this.handleOk,
            primary: true,
            children: labelOk,
          }
        ]}
      >
        {message}
      </DialogContainer>
    )
  }
}

export default ConfirmDialog
