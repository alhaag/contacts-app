// third party
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// styles
import style from '../../../styles/widgets/expansion-panel.scss'


class ExpansionPanel extends Component {

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.node,
    secondaryLabel: PropTypes.node,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool,
  }

  static defaultProps = {
    open: false,
  }

  render() {

    let { label, secondaryLabel, children, open } = this.props

    return (
      <details open={open}>
        <summary>
          <ul>
              <li className="titleName">{label}</li>
              <li className="titleValue">{secondaryLabel}</li>
              <li></li>
          </ul>
        </summary>
        <div className="content">
            {children}
        </div>
      </details>
    )
  }
}

export default ExpansionPanel
