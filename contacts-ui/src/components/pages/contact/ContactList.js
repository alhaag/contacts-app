// third party
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Toolbar from 'react-md/lib/Toolbars/Toolbar'
import List from 'react-md/lib/Lists/List'
import ListItem from 'react-md/lib/Lists/ListItem'
import Avatar from 'react-md/lib/Avatars/Avatar'
import TextField from 'react-md/lib/TextFields/TextField'
import Button from 'react-md/lib/Buttons/Button'
// actions
import { fetchContacts } from 'actions/ContactActions'
// components
import LoadingPage from 'components/widgets/LoadingPage'
// icons
import { PersonIcon, VisibilityIcon, SearchIcon, AddIcon, CloseIcon } from 'components/icons/IconSet'


@withRouter
@connect(state => ({
  isLoading: state.contact.list.isLoading,
  list: state.contact.list.data,
  mobile: (state.browser.is.small || state.browser.is.extraSmall),
}), {
  fetchContacts,
})

class ContactList extends Component {

  static propTypes = {
    className: PropTypes.string,
    fetchContacts: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    list: PropTypes.object.isRequired,
    mobile: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.fetchContacts()
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  handleNew = () => {
    this.props.history.push('/contact/new')
  }

  handleShowSearch = () => {

  }

  handleViewItem = (itemId) => {
    this.props.history.push(`/contact/details/${itemId}`)
  }

  render() {
    let { isLoading, list, mobile } = this.props

    return(
      <div id="list-content">
        <Toolbar
          id="full-page-toolbar"
          title="Contatos"
          titleId="simple-full-page-dialog-title"
          actions={
            <div>
              <Button primary icon onClick={this.handleNew}><AddIcon /></Button>
              <Button primary icon onClick={this.handleShowSearch}><SearchIcon /></Button>
            </div>
          }
        />
        { isLoading ?
        <LoadingPage /> :
        <div className="md-grid grid-not-space-top">
          <div className="md-cell md-cell--12">
            <Toolbar
              style={{color: '#666666'}}
              className="md-divider-border md-divider-border--bottom md-paper md-paper--1 form-paper background-white"
              title={
                <TextField
                  id="input-search"
                  className="md-text-field-container md-full-width md-text-field--toolbar md-autocomplete"
                  autoComplete="off"
                  placeholder="Pesquisar..."
                  //value={search}
                  //onChange={this.handleSearchChange}
                />
              }
              nav={
                <Button icon onClick={this.handleCloseDrawer}><CloseIcon/></Button>
              }

            />
            <br/>
            <List className="md-paper md-paper--1 form-paper">
              {list.rows.map(item =>
                <ListItem
                  key={item.id}
                  leftAvatar={<Avatar id="tour-icon" icon={<PersonIcon/>} />}
                  rightIcon={(!mobile) ? <VisibilityIcon /> : null}
                  primaryText={item.name}
                  secondaryText={item.alias}
                  onClick={() => this.handleViewItem(item.id)}
                />
              )}
            </List>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default ContactList
