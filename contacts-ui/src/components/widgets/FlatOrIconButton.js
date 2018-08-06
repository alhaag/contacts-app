// third party
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from 'react-md/lib/Buttons/Button'

@connect(state => ({
  mobile: (state.browser.is.small || state.browser.is.extraSmall),
}))

class FlatOrIconButton extends Component {

  static propTypes = {
    className: PropTypes.string,
    mobile: PropTypes.bool,
    children: PropTypes.node.isRequired,
  }

  render() {
    let { children, mobile, ...others } = this.props

    return (
      <Button
        icon={mobile}
        flat={!mobile}
        primary
        tooltipLabel={mobile ? children : null}
        {...others}
      >
        {mobile ? null : children}
      </Button>
    )
  }
}

export default FlatOrIconButton
