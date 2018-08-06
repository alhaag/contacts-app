// third party
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Toolbar from 'react-md/lib/Toolbars/Toolbar'
import List from 'react-md/lib/Lists/List'
import ListItem from 'react-md/lib/Lists/ListItem'
import Divider from 'react-md/lib/Dividers/Divider'
import Avatar from 'react-md/lib/Avatars/Avatar'
import Button from 'react-md/lib/Buttons/Button'
// actions
import { fetchContact } from 'actions/ContactActions'
// components
import LoadingPage from 'components/widgets/LoadingPage'
// icons
import {
  ArrowBackIcon, EditIcon, PersonIcon, PhoneIcon, EmailIcon, PlaceIcon, SiteIcon, CommentIcon
} from 'components/icons/IconSet'


@withRouter
@connect(state => ({
  isLoading: state.contact.item.isLoading,
  item: state.contact.item.data,
  mobile: (state.browser.is.small || state.browser.is.extraSmall),
}), {
  fetchContact,
})

class ContactDetails extends Component {

  static propTypes = {
    className: PropTypes.string,
    fetchContact: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    mobile: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    item: {
      phones: [],
      mails: []
    }
  }

  constructor(props) {
    super()
    this.state = {
      fixedHeight: null,
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id
    this.props.fetchContact(id)
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  handleEdit = () => {
    let id = this.props.match.params.id
    this.props.history.push(`/contact/edit/${id}`)
  }

  render() {
    let { isLoading, item, mobile } = this.props
    const phones = item.phones || []
    const mails = item.mails || []

    return(
      <div id="list-content">
        <Toolbar
          id="full-page-toolbar"
          title="Contato"
          titleId="simple-full-page-dialog-title"
          nav={<Button icon onClick={this.handleBack}><ArrowBackIcon/></Button>}
          actions={<Button primary icon onClick={this.handleEdit}><EditIcon /></Button>}
        />
        { isLoading ?
          <LoadingPage /> :
          <div className="md-grid grid-not-space-top">
            <div className="md-cell md-cell--12">
              <List className="md-paper md-paper--1 form-paper">
                  <ListItem
                    leftAvatar={<Avatar icon={<PersonIcon/>} />}
                    primaryText={item.name}
                    secondaryText={item.alias}
                  />
                  {phones.length > 0 ? <Divider inset /> : null}
                  {phones.map(phone =>
                    <ListItem
                      key={`phone-${phone.id}`}
                      leftIcon={<PhoneIcon />}
                      primaryText={phone.number}
                      secondaryText={phone.phone_type.name}
                    />
                  )}
                  {mails.length > 0 ? <Divider inset /> : null}
                  {mails.map(mail =>
                    <ListItem
                      key={`mail-${mail.id}`}
                      leftIcon={<EmailIcon />}
                      primaryText={mail.address}
                    />
                  )}
                  {item.address ? <Divider inset /> : null}
                  {item.address ?
                    <ListItem
                      leftIcon={<PlaceIcon />}
                      primaryText={item.address}
                    /> :
                    null
                  }
                  {item.site ? <Divider inset /> : null}
                  {item.site ?
                    <ListItem
                      leftIcon={<SiteIcon />}
                      primaryText={item.site}
                    /> :
                    null
                  }
                  {item.comments ? <Divider inset /> : null}
                  {item.comments ?
                    <ListItem
                      leftIcon={<CommentIcon />}
                      primaryText={item.comments}
                    /> :
                    null
                  }
              </List>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default ContactDetails
