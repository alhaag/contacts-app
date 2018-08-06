// third party
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// styles
import style from '../../styles/widgets/action-bar-bottom.scss'


class ActionBarBottom extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
    }

    render() {

        let { children } = this.props;

        return (
            <div className="bottom-action-bar">
                {children}
            </div>
        )
    }

}

export default ActionBarBottom
