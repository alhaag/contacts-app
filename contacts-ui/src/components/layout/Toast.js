import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import Snackbar from 'react-md/lib/Snackbars/SnackbarContainer'

import { dismissToast } from 'actions/ToastActions'

import style from 'styles/layout/toast.scss'


@withRouter
@connect(state => ({
  toasts: state.toast.toasts,
  autohide: state.toast.autohide,
}), {
  dismissToast,
})

class Toast extends Component {

  state = {
    classType: 'info'
  }

  static propTypes = {
    // id: PropTypes.string.isRequired,
    className: PropTypes.string,
    toasts: PropTypes.array.isRequired,
    autohide: PropTypes.bool.isRequired,
  }

  componentWillReceiveProps(newProps) {
    if (newProps.toasts.length > 0) {
      const classType = newProps.toasts[0].type
      return this.setState({classType})
    }
  }

  handleDismissToast = () => {
    this.props.dismissToast()
  }

  render() {

    let { toasts, autohide } = this.props
    let { classType } = this.state

    return(
      <Snackbar
        id="application-toasts"
        className={classType}
        toasts={toasts}
        autohide={autohide}
        autohideTimeout={3000}
        onDismiss={this.handleDismissToast}
      />
    )

  }

}

export default Toast
