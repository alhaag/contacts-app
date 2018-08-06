// third party
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DialogContainer from 'react-md/lib/Dialogs/DialogContainer'
import List from 'react-md/lib/Lists/List'
import ListItem from 'react-md/lib/Lists/ListItem'
// components
import { AddIcon } from 'components/icons/IconSet'


class DialogAddFilter extends Component {

  static propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super()
    this.state = {
      visibleDialog: false,
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ visibleDialog: newProps.visible })
  }

  handleHideDialog = () => {
    this.setState({ visibleDialog: false })
    this.handleSelect(null)
  }

  handleKeyDown = (e) => {
    /*const key = e.which || e.keyCode;
    if (key === 13 || key === 32) {
      // also close on enter or space keys
      this.handleHideDialog()
    }*/
  }

  handleSelect = (item) => {
    this.props.onSelect(item)
  }

  render() {
    let { visibleDialog } = this.state
    let { options } = this.props

    return(
      <DialogContainer
        id="scrolling-content-dialog"
        aria-describedby="scrolling-content-dialog-content"
        visible={visibleDialog}
        title="Selecione o filtro"
        onHide={this.handleHideDialog}
        width={400}
        actions={[{
          onClick: this.handleHideDialog,
          primary: true,
          children: 'Cancelar',
        }]}
      >
        <List onKeyDown={this.handleKeyDown}>
          {options.map(item =>
            <ListItem
              key={item.value}
              leftIcon={<AddIcon/>}
              onClick={() => this.handleSelect(item.value)}
              primaryText={item.label}
            />
          )}
        </List>
      </DialogContainer>
    )
  }
}

export default DialogAddFilter
