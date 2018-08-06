// third party
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'react-md/lib/TextFields/TextField'
import SelectField from 'react-md/lib/SelectFields/SelectField'
import Switch from 'react-md/lib/SelectionControls/Switch'
import Button from 'react-md/lib/Buttons/Button'
// utilits
import { removeEmptyKeys } from 'utils/ObjectUtils'
// valadation
import { run, ruleRunner } from 'utils/form/ruleRunner'
import { required } from 'utils/form/rules'
// components
import { DeleteIcon, ArrowDropDownIcon } from 'components/icons/IconSet'

const fieldValidations = [
  ruleRunner("number", "Telefone", required),
]

class PhoneForm extends Component {

  static propTypes = {
    className: PropTypes.string,
    index: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    phoneTypes: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    mobile: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super()
    this.state = {
      data: {
        id: null,
        number: '',
        id_phone_type: '',
        is_whatsapp: 0,
      },
      showErrors: false, // nao apresenta erros antes de submeter
      validationErrors: {},
    }
  }

  componentDidMount() {
    this.reloadState(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.reloadState(newProps)
  }

  reloadState(props) {
    if (! this.state.isLoadedForm && props.data && Object.keys(props.data).length > 0) {
      let { data } = this.state
      const propsLaudo = removeEmptyKeys(props.data)
      const mergedData = { ...data, ...propsLaudo }
      this.setState({ data: mergedData, isLoadedForm: true })
    }
  }

  handleRemove = () => {
    let { index } = this.props
    this.props.onRemove(index)
  }

  handleInputChange = (value, event) => {
    const field = event.target.name;
    this.handleFieldChange(field, value, event)
  }

  handleSelectChange = (value, index, event, extra) => {
    const field = extra.name
    this.handleFieldChange(field, value, event)
  }

  handleSwitchChange = (value, event) => {
    const field = event.target.name
    let normalizedValue = (value) ? 1 : 0
    this.handleFieldChange(field, normalizedValue, event)
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

  /**
   * @public
   */
  validate = () => {
    this.setState({showErrors: true})
    const errors = this.validateForm()
    if (Object.keys(errors).length > 0) {
      const firstIdFieldError = Object.keys(errors)[0];
      var element = document.getElementById('input-' + firstIdFieldError)
      if (element) element.focus()
      return false
    }
    return true
  }

  /**
   * @public
   */
  getData = () => {
    let { data } = this.state
    return data
  }

  render() {
    let { className, index, phoneTypes, mobile } = this.props
    let { data } = this.state
    const labelIndex = (index + 1)
    const isWhatsApp = (data.is_whatsapp == 1) ? true : false

    return(
      <div className={`md-grid ${className}`}>
        <TextField
          id={`input-number-${index}`}
          className="md-cell md-cell--3"
          name="number"
          autoComplete="off"
          label={`Telefone ${labelIndex}`}
          lineDirection="center"
          maxLength={14}
          value={data.number}
          onChange={this.handleInputChange}
          errorText={this.errorText('number')}
          error={this.showError('number')}
          required
        />
        <SelectField
          id={`input-id_phone_type-${index}`}
          className="md-cell md-cell--3"
          name="id_phone_type"
          label="Tipo"
          dropdownIcon={<ArrowDropDownIcon/>}
          placeholder="Selecione o tipo"
          itemLabel="name"
          itemValue="id"
          menuItems={phoneTypes.rows}
          value={data.id_phone_type}
          onChange={this.handleSelectChange}
          required
          position={SelectField.Positions.BOTTOM_RIGHT}
        />
        <Switch
          id={`switch-is_whatsapp-${index}`}
          className="md-cell md-cell--3 inline-form-buttom"
          type="switch"
          label="WhatsApp?"
          name="is_whatsapp"
          onChange={this.handleSwitchChange}
          value={isWhatsApp}
        />
        <Button
          className="inline-form-buttom"
          primary
          icon
          onClick={this.handleRemove}>
            <DeleteIcon />
          </Button>
      </div>
    )
  }
}

export default PhoneForm
