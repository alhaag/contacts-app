// third party
import fetch from 'cross-fetch'
// utils
import RequestUtils from '../utils/RequestUtils'
// constants
import {
  REQUEST_CONTACTS, RECEIVE_CONTACTS, REQUEST_CONTACT, RECEIVE_CONTACT, REQUEST_SAVE_CONTACT, RECEIVE_SAVE_CONTACT,
  REQUEST_CONTACT_GROUPS, RECEIVE_CONTACT_GROUPS, RESET_CONTACT
} from '../constants/ActionTypes'
// actions
import { addToast } from './ToastActions'

function requestContactGroups() {
  return {
    type: REQUEST_CONTACT_GROUPS,
    isLoading: true,
  }
}

function receiveContactGroups(data) {
  return {
    type: RECEIVE_CONTACT_GROUPS,
    isLoading: false,
    data: data,
    receivedAt: Date.now(),
  }
}

/**
 * Carrega listagem de grupos de contatos.
 */
export function fetchContactGroups() {
  return (dispatch, getState) => {
    dispatch(requestContactGroups())
    const endPoint = `${API_HOST}/person/group`
    const url = RequestUtils.fetchURL(endPoint)
    const headers = RequestUtils.defaultHeaders()
    const options = {
      method: 'GET',
      headers: headers,
    }
    let responseCode = 0
    return fetch(url, options)
      .then(res => {
        responseCode = res.status
        return res.json()
      })
      .then(json => {
        return RequestUtils.responseHandler(dispatch, responseCode, json, {
          err400: 'Erro ao consultar grupos!',
          err401: 'Sessão expirada!',
          err403: 'Sem permisão para consultar grupos!',
          err500: 'Erro ao consultar grupos!',
          errDefault: 'Erro desconhecido ao consultar grupos!'
        })
      })
      .then(json => {
        dispatch(receiveContactGroups(json))
      })
      .catch(err => {
        dispatch(addToast('error', err.message, null, true))
      })
  }
}

function requestContacts() {
  return {
    type: REQUEST_CONTACTS,
    isLoading: true,
  }
}

function receiveContacts(data) {
  return {
    type: RECEIVE_CONTACTS,
    isLoading: false,
    data: data,
    receivedAt: Date.now(),
  }
}

/**
 * Carrega listagem de contatos.
 *
 * @param {Object} params Parâmetros de busca e ordenação. (page, limit, orderBy, orderDirection)
 * @param {Boolean} silent Indica se o carregamento deve ser silencioso (não exibir carregando).
 */
export function fetchContacts(params = { page: 1, limit: 1000, orderBy: 'name', orderDirection: 'ASC' }) {
  return (dispatch, getState) => {
    dispatch(requestContacts())
    const endPoint = `${API_HOST}/person`
    const url = RequestUtils.fetchURL(endPoint, params)
    const headers = RequestUtils.defaultHeaders()
    const options = {
      method: 'GET',
      headers: headers,
    }
    let responseCode = 0
    return fetch(url, options)
      .then(res => {
        responseCode = res.status
        return res.json()
      })
      .then(json => {
        return RequestUtils.responseHandler(dispatch, responseCode, json, {
          err400: 'Erro ao consultar contatos!',
          err401: 'Sessão expirada!',
          err403: 'Sem permisão para consultar contatos!',
          err500: 'Erro ao consultar contatos!',
          errDefault: 'Erro desconhecido ao consultar contatos!'
        })
      })
      .then(json => {
        dispatch(receiveContacts(json))
      })
      .catch(err => {
        dispatch(addToast('error', err.message, null, true))
      })
  }
}

function requestContact() {
  return {
    type: REQUEST_CONTACT,
    isLoading: true,
  }
}

function receiveContact(data) {
  return {
    type: RECEIVE_CONTACT,
    isLoading: false,
    data: data,
    receivedAt: Date.now(),
  }
}

/**
 * Obtem um contato por ID.
 *
 * @param {Number} params ID do contato.
 */
export function fetchContact(id) {
  return (dispatch, getState) => {
    dispatch(requestContact())
    const url = `${API_HOST}/person/${id}`
    const headers = RequestUtils.defaultHeaders()
    const options = {
      method: 'GET',
      headers: headers,
    }
    let responseCode = 0
    return fetch(url, options)
      .then(res => {
        responseCode = res.status
        return res.json()
      })
      .then(json => {
        return RequestUtils.responseHandler(dispatch, responseCode, json, {
          err400: 'Erro ao consultar contato!',
          err401: 'Sessão expirada!',
          err403: 'Sem permisão para consultar contato!',
          err500: 'Erro ao consultar contato!',
          errDefault: 'Erro desconhecido ao consultar contato!'
        })
      })
      .then(json => dispatch(receiveContact(json)))
      .catch(err => {
        dispatch(addToast('error', err.message, null, true))
      })
  }
}

function requestSaveContact() {
  return {
    type: REQUEST_SAVE_CONTACT,
    isLoading: true,
  }
}

function receiveSaveContact() {
  return {
    type: RECEIVE_SAVE_CONTACT,
    isLoading: false,
    receivedAt: Date.now(),
  }
}

/**
 * Persiste os dados do person. Se existir id atualiza(PUT),
 * caso contrário cria(POST).
 *
 * @param {Number} id
 * @param {Object} data
 */
export function saveContact(id, data, callback) {
  callback = callback || function () {}
  return (dispatch, getState) => {
    dispatch(requestSaveContact())
    const url = (id) ? `${API_HOST}/person/${id}` :`${API_HOST}/person`
    const headers = RequestUtils.defaultHeaders()
    const options = {
      method: (id) ? 'PUT' : 'POST',
      headers: headers,
      body: JSON.stringify(data),
    }
    let responseCode = 0
    return fetch(url, options)
      .then(res => {
        responseCode = res.status
        return res.json()
      })
      .then(json => {
        return RequestUtils.responseHandler(dispatch, responseCode, json, {
          err400: 'Erro ao salvar contato!',
          err401: 'Sessão expirada!',
          err403: 'Sem permisão para salvar contato!',
          err500: 'Erro ao tentar salvar contato! Contate o administrador',
          errDefault: 'Erro desconhecido ao salvar contato!'
        })
      }).then(json => {
        dispatch(receiveSaveContact())
        callback(json)
        if (typeof window != 'undefined') { // em ambiente de teste nao existe
          window.router.push(`/contact/details/${json.id}`)
        }
      }).catch(err => {
        dispatch(addToast('error', err.message, null, true))
      })
  }
}

/**
 * Remove um contato por ID.
 *
 * @param {Number} id
 */
export function removeContact(id) {
  return (dispatch, getState) => {
    dispatch(requestSaveContact())
    const url = `${API_HOST}/person/${id}`
    const headers = RequestUtils.defaultHeaders()
    const options = {
      method: 'DELETE',
      headers: headers,
    }
    let responseCode = 0
    return fetch(url, options)
      .then(res => {
        responseCode = res.status
        return res.json()
      })
      .then(json => {
        return RequestUtils.responseHandler(dispatch, responseCode, json, {
          err400: 'Erro ao remover contato!',
          err401: 'Sessão expirada!',
          err403: 'Sem permisão para remover contato!',
          err500: 'Erro ao tentar remover contato! Contate o administrador',
          errDefault: 'Erro desconhecido ao remover contato!'
        })
      }).then(json => {
        dispatch(receiveSaveContact())
      }).catch(err => {
        dispatch(addToast('error', err.message, null, true))
      })
  }
}

export function resetContact() {
  return {
    type: RESET_CONTACT,
  }
}
