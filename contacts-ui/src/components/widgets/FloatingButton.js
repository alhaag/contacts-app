// third party
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from 'react-md/lib/Buttons/Button'
// styles
import style from 'styles/widgets/floating-button.scss'


@connect(state => ({
    mobile: (state.browser.is.small || state.browser.is.extraSmall),
}))

class FloatingButton extends Component {

    static propTypes = {
        className: PropTypes.string,
        mobile: PropTypes.bool.isRequired,
        icon: PropTypes.node.isRequired,
        onClick: PropTypes.func.isRequired,
        relativeTableFooter: PropTypes.bool,
        relativeRightGrid: PropTypes.bool,
    }

    render() {

        let { className, icon, onClick, relativeTableFooter = false, relativeRightGrid = false } = this.props
        let fullClassName = 'floating-button'
        if (relativeTableFooter) {
            fullClassName += ' relative-table-footer'
        }
        if (relativeRightGrid) {
            fullClassName += ' relative-right-grid'
        }
        if (className) {
            fullClassName += ' ' + className
        }

        return (
            <Button
              className={fullClassName}
              floating
              primary
              onClick={onClick}
              svg >
                {icon}
            </Button>
        )
    }

}

export default FloatingButton