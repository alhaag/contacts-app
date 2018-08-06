// third party
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Toolbar from 'react-md/lib/Toolbars/Toolbar'
import Button from 'react-md/lib/Buttons/Button'
import TextField from 'react-md/lib/TextFields/TextField'
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup'
// actions
import { addToast } from 'actions/ToastActions'
import { fetchContact, saveContact, resetContact } from 'actions/ContactActions'
import { fetchPhoneTypes, savePhone, removePhone } from 'actions/PhoneActions'
// components
import LoadingPage from 'components/widgets/LoadingPage'
import PhoneForm from './PhoneForm'
// utilits
import { removeEmptyKeys } from 'utils/ObjectUtils'
// valadation
import { run, ruleRunner } from 'utils/form/ruleRunner'
import { required } from 'utils/form/rules'
// icons
import { ArrowBackIcon, DeleteIcon, AddIcon, DoneIcon } from 'components/icons/IconSet'

const fieldValidations = [
  ruleRunner("name", "Nome", required),
]

@withRouter
@connect(state => ({
  isLoading: state.contact.item.isLoading,
  item: state.contact.item.data,
  phoneTypes: state.phone.types.data,
  mobile: (state.browser.is.small || state.browser.is.extraSmall),
}), {
  addToast,
  fetchContact,
  resetContact,
  fetchPhoneTypes,
  savePhone,
  saveContact,
  removePhone
})

class ContactEdit extends Component {

  constructor(props) {
    super()
    this.state = {
      isLoadedForm: false,
      data: {
        id: null,
        name: '',
        alias: '',
        address: '',
        site: '',
        comments: '',
      },
      phones: [],
      mails: [],
      phonesToRemove: [],
      showErrors: false, // nao apresenta erros antes de submeter
      validationErrors: {},
    }
    this.formPhoneInstances = {}
  }

  static propTypes = {
    className: PropTypes.string,
    fetchContact: PropTypes.func.isRequired,
    saveContact: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    mobile: PropTypes.bool.isRequired,
  }

  getId = () => {
    return this.props.match.params.id
  }

  componentDidMount() {
    this.props.fetchPhoneTypes()
    let id = this.getId()
    if (id) this.props.fetchContact(id)
  }

  componentWillReceiveProps(newProps) {
    // load first data only
    if (newProps.item && Object.keys(newProps.item).length > 0 && !this.state.isLoadedForm) {
      const stateData = this.state.data
      const propsData = removeEmptyKeys(newProps.item)
      const data = { ...stateData, ...propsData }
      const phones = (newProps.item.phones.length > 0) ? newProps.item.phones : []
      return this.setState({ data: data, phones: phones, isLoadedForm: true })
    }
  }

  componentWillUnmount() {
    this.props.resetContact()
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  handleRemoveContact = () => {
    // TODO
  }

  addPhone = () => {
    let { phones } = this.state
    phones.push(JSON.parse(JSON.stringify({ id: '' })))
    this.setState({ phones })
  }

  removePhone = (index) => {
    let { phones, phonesToRemove } = this.state
    if (phones[index].id) phonesToRemove.push(phones[index].id)
    phones.splice(index, 1)
    delete this.formPhoneInstances[index]
    this.setState({ phones, phonesToRemove })
  }

  handleInputChange = (value, event) => {
    const field = event.target.name;
    this.handleFieldChange(field, value, event)
  }

  handleFieldChange = (field, value) => {
    let data = this.state.data
    data[field] = value
    this.setState({data: data})
    this.validateForm()
  }

  errorText = (name) => {
    return this.state.validationErrors[name]
  }

  showError = (name) => {
    return (this.state.showErrors && this.state.validationErrors[name]) ? true : false;
  }

  validateForm = () => {
    const validationErrors = run(this.state.data, fieldValidations);
    this.setState({ validationErrors: validationErrors })
    return validationErrors
  }

  savePhones = (idSaved) => {
    let idContact = idSaved || this.getId()
    // post and put
    const instanceKeys = Object.keys(this.formPhoneInstances)
    for (let i = 0; i < instanceKeys.length; i++) {
      const instance = this.formPhoneInstances[instanceKeys[i]]
      if (instance) {
        let phoneData = instance.getData()
        phoneData.id_person = idContact
        this.props.savePhone(phoneData.id, phoneData)
      }
    }
    // delete
    let { phonesToRemove } = this.state
    for (let i = 0; i < phonesToRemove.length; i++) {
      this.props.removePhone(phonesToRemove[i])
    }
  }

  handleSubmit = () => {
    this.setState({ showErrors: true })
    const errors = this.validateForm()
    // validate person form
    if (Object.keys(errors).length > 0) {
      this.props.addToast('error', 'Atenção! Corrija os campos inválidos.', null, true)
      const firstIdFieldError = Object.keys(errors)[0];
      var element = document.getElementById('input-' + firstIdFieldError)
      if (element) element.focus()
      return
    }
    // validate phones
    var countInstances = 0
    const instanceKeys = Object.keys(this.formPhoneInstances)
    for (let i = 0; i < instanceKeys.length; i++) {
      const instance = this.formPhoneInstances[instanceKeys[i]]
      if (instance) {
        countInstances++
        if (! instance.validate()) {
          this.props.addToast('error', 'Atenção! Corrija o(s) campo(s) inválido(s).', null, true)
          return
        }
      }
    }

    let { data } = this.state
    let that = this
    this.props.saveContact(data.id, data, function(result) {
      that.savePhones(result.id)
    })
  }

  render() {
    let { isLoading, mobile, phoneTypes } = this.props
    let { data, phones } = this.state
    const titleSufix = (this.getId()) ? 'atualização' : 'novo'

    return(
      <div id="edit-content">
        <Toolbar
          id="full-page-toolbar"
          title={`Contato (${titleSufix})`}
          titleId="simple-full-page-dialog-title"
          nav={<Button icon onClick={this.handleBack}><ArrowBackIcon/></Button>}
          actions={
            <div>
              {data.id ? <Button primary icon onClick={this.handleRemoveContact}><DeleteIcon /></Button> : null}
              <Button primary icon onClick={this.handleSubmit}><DoneIcon /></Button>
            </div>
          }
        />
        {isLoading ?
          <LoadingPage /> :
          <div className="md-grid grid-not-space-top">
            <div className="md-cell md-cell--12 md-paper md-paper--1 form-paper background-white">
              <form className="md-grid text-fields__application" autoComplete="off">
                <TextField
                  id="input-name"
                  className="md-cell md-cell--12"
                  name="name"
                  autoComplete="off"
                  label="Nome"
                  lineDirection="center"
                  maxLength={255}
                  value={data.name}
                  onChange={this.handleInputChange}
                  errorText={this.errorText('name')}
                  error={this.showError('name')}
                  required
                />
                {phones.map((phone, index) =>
                  <PhoneForm
                    ref={instance => { this.formPhoneInstances[index] = instance }}
                    index={index}
                    key={index.toString()}
                    className="md-cell md-cell--12"
                    mobile={mobile}
                    data={phone}
                    phoneTypes={phoneTypes}
                    onRemove={this.removePhone}
                  />
                )}
                <div className="md-cell md-cell--12">
                  <Button
                    raised
                    className="btn-success left"
                    iconEl={<AddIcon />}
                    onClick={this.addPhone}
                  >
                    Adicionar telefone
                  </Button>
                </div>
                <TextField
                  id="input-address"
                  className="md-cell md-cell--12"
                  name="address"
                  autoComplete="off"
                  label="Endereço"
                  lineDirection="center"
                  maxLength={255}
                  value={data.address}
                  onChange={this.handleInputChange}
                  errorText={this.errorText('address')}
                  error={this.showError('address')}
                />
                <TextField
                  id="input-site"
                  className="md-cell md-cell--12"
                  name="site"
                  autoComplete="off"
                  label="Site"
                  lineDirection="center"
                  maxLength={255}
                  value={data.site}
                  onChange={this.handleInputChange}
                  errorText={this.errorText('site')}
                  error={this.showError('site')}
                />
                <TextField
                  id="input-comments"
                  className="md-cell md-cell--12"
                  name="comments"
                  autoComplete="off"
                  label="Comnetários"
                  lineDirection="center"
                  maxLength={255}
                  value={data.comments}
                  onChange={this.handleInputChange}
                  errorText={this.errorText('comments')}
                  error={this.showError('comments')}
                />
              </form>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default ContactEdit
