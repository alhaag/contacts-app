// third party
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectTooltip from 'react-md/lib/Tooltips/injectTooltip'

const styles = {
  tooltipContainer: {
    position: 'relative',
    display: 'inline-block',
    // margin: '1em',
  },
}

class Tooltip extends Component {

  static propTypes = {
    children: PropTypes.node,
    tooltip: PropTypes.node,
  }

  render() {
    const {
      children,
      tooltip
    } = this.props;

    return (
      <div style={styles.tooltipContainer} >
        {tooltip}
        {children}
      </div>
    )
  }
}

export default injectTooltip(Tooltip)