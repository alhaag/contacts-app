// third party
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DialogContainer from 'react-md/lib/Dialogs/DialogContainer'
import TextField from 'react-md/lib/TextFields/TextField'
import DatePicker from 'react-md/lib/Pickers/DatePicker'
import SelectField from 'react-md/lib/SelectFields/SelectField'
import Button from 'react-md/lib/Buttons/Button'
// components
import DialogAddFilter from './DialogAddFilter'
import { DeleteIcon, AddIcon, ArrowDropDownIcon } from 'components/icons/IconSet'
// styles
import style from 'styles/widgets/filter-list/dialog-filter-list.scss'


class DialogFilterList extends Component {

  static propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    loggedUser:  PropTypes.object,
    onFilter: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  constructor(props) {
    super()
    this.state = {
      visibleDialog: false,
      visibleAddFilterDialog: false,
      filters: []
    }
  }

  componentWillReceiveProps(newProps) {
    // force one way data bind
    let props = JSON.parse(JSON.stringify(newProps))
    this.setState({ visibleDialog: props.visible })
    if (props.filters) {
      let filters = this.parseFilterByUser(props.filters)
      this.setState({ filters: filters })
    }
  }

  handleHideDialog = () => {
    this.props.onClose()
  }

  parseFilterByUser = (filters) => {
    let { loggedUser } = this.props
    if (! loggedUser) {
      return filters
    }
    return filters.filter(item => {
      return (! item.users || item.users.indexOf(loggedUser.tipo) != -1)
    })
  }

  getFilterByName = (name) => {
    const { filters } = this.state
    return filters.find(item => item.name === name)
  }

  handleInputChange = (value, event) => {
    const field = event.target.name;
    this.handleFieldChange(field, value, event)
  }

  handleFieldChange = (field, value, event, extra) => {
    const { filters } = this.state
    let changedFilters = filters.map(item => {
      if (item.name === field) {
        item.value = value
      }
      return item
    })
    this.setState({ filters: changedFilters })
    // this.validateForm()
  }

  getFieldValue = (name) => {
    const filter = this.getFilterByName(name)
    return filter.value
  }

  toggleActiveFilter = (name, state) => {
    const { filters } = this.state
    let changedFilters = filters.map(item => {
      if (item.name === name) {
        item.active = state
        if (item.type == 'text') {
          item.value = ''
        } else if (item.type == 'data_range') {
          item.pickers.start.value = ''
          item.pickers.end.value = ''
        }
      }
      return item
    })
    this.setState({ filters: changedFilters })
  }

  handleShowAddFilterDialog = () => {
    this.setState({ visibleAddFilterDialog: true })
  }

  handleAddFilter = (name) => {
    this.setState({ visibleAddFilterDialog: false })
    if (name) {
      this.toggleActiveFilter(name, true)
      // aguarda elemento ser renderizado no dom
      setTimeout(() => {
        document.getElementById('input-filter-' + name).focus()
      }, 400)
    }
  }

  handleRemoveFilter = (name) => {
    this.toggleActiveFilter(name, false)
  }

  handleRemoveAll = () => {
    const { filters } = this.state
    let changedFilters = filters.map(item => {
      item.active = false
      if (item.type == 'text') {
        item.value = ''
      } else if (item.type == 'data_range') {
        item.pickers.start.value = ''
        item.pickers.end.value = ''
      }
      return item
    })
    this.setState({ filters: changedFilters })
  }

  handleApplyFilters = () => {
    const { filters } = this.state
    // console.log('filters', filters)
    this.props.onFilter(filters)
  }

  render() {
    let { visibleDialog, visibleAddFilterDialog, filters } = this.state
    // normalize avaliable filters
    let availableFilters = filters.reduce((prev, item) => {
      if (! item.active) {
        prev.push({ value: item.name, label: `${item.label}` })
      }
      return prev
    }, [])
    // reduce active filters
    let activeFilters = filters.reduce((prev, item) => {
      if (item.active) {
        prev.push(item)
      }
      return prev
    }, [])

    const actions = [{
      onClick: this.handleHideDialog,
      primary: true,
      children: 'Cancelar',
      title: 'Descartar últimas alterações'
    }, {
      onClick: this.handleApplyFilters,
      primary: true,
      children: 'Aplicar',
      title: 'Aplica as configurações de filtro atuais'
    }]

    return(
      <div>
        <DialogContainer
          id="scrolling-content-dialog"
          aria-describedby="scrolling-content-dialog-content"
          visible={visibleDialog}
          title="Filtros de busca"
          onHide={this.handleHideDialog}
          width={500}
          actions={actions}
        >
          {activeFilters.map(item =>
            <div className="md-grid" key={item.name}>
              {(item.type == 'text') ?
                <TextField
                  id={`input-filter-${item.name}`}
                  className="md-cell md-cell--10"
                  autoComplete="off"
                  name={item.name}
                  label={item.label}
                  lineDirection="center"
                  maxLength={128}
                  value={this.getFieldValue(item.name)}
                  onChange={this.handleInputChange}
                  // errorText={this.errorText('paciente_peso')}
                  // error={this.showError('paciente_peso')}
                  required
                /> :
                null
              }
              {(item.type == 'date_range') ?
                <DatePicker
                  id={`input-filter-${item.name}`}
                  className="md-cell md-cell--10"
                  name={item.name}
                  label={item.label}
                  lineDirection="center"
                  maxLength={6}
                  value={this.getFieldValue(item.name).start}
                  onChange={this.handleInputChange}
                  // errorText={this.errorText('paciente_peso')}
                  // error={this.showError('paciente_peso')}
                  required
                /> :
                null
              }
              <div className="md-cell md-cell--2">
                <Button
                  className="remove-filter"
                  icon
                  secondary
                  iconEl={<DeleteIcon />}
                  onClick={() => {this.handleRemoveFilter(item.name)}}
                />
              </div>
            </div>
          )}
          {(activeFilters.length === 0) ?
            <p>Nenhum filtro selecionado.</p> :
            null
          }
          <Button
            primary
            disabled={(availableFilters.length == 0)}
            title="Adiciona um novo filtro"
            iconEl={<AddIcon />}
            onClick={this.handleShowAddFilterDialog}
          >
           ADICIONAR
          </Button>
          {(activeFilters.length > 0) ?
          <Button
            primary
            disabled={(availableFilters.length == 0)}
            title="Remove todos os filtros"
            iconEl={<DeleteIcon />}
            onClick={this.handleRemoveAll}
          >
           LIMPAR TODOS
          </Button> :
          null}
        </DialogContainer>
        <DialogAddFilter
          visible={visibleAddFilterDialog}
          options={availableFilters}
          onSelect={this.handleAddFilter}
        />
      </div>
    )
  }
}

export default DialogFilterList
