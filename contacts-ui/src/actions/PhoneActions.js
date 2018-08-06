// third party
import fetch from 'cross-fetch'
// utils
import RequestUtils from '../utils/RequestUtils'
// constants
import { REQUEST_TYPES, RECEIVE_TYPES, REQUEST_SAVE_PHONE, RECEIVE_SAVE_PHONE } from '../constants/ActionTypes'
// actions
import { addToast } from './ToastActions'


function requestPhoneTypes() {
  return {
    type: REQUEST_TYPES,
    isLoading: true,
  }
}

function receivePhoneTypes(data) {
  return {
    type: RECEIVE_TYPES,
    isLoading: false,
    data: data,
    receivedAt: Date.now(),
  }
}

/**
 * Carrega listagem de tipos de telefones.
 */
export function fetchPhoneTypes() {
  return (dispatch, getState) => {
    dispatch(requestPhoneTypes())
    const endPoint = `${API_HOST}/phone/type`
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
          err400: 'Erro ao consultar tipos de telefones!',
          err401: 'Sessão expirada!',
          err403: 'Sem permisão para consultar tipos de telefones!',
          err500: 'Erro ao consultar tipos de telefones!',
          errDefault: 'Erro desconhecido ao consultar tipos de telefones!'
        })
      })
      .then(json => {
        dispatch(receivePhoneTypes(json))
      })
      .catch(err => {
        dispatch(addToast('error', err.message, null, true))
      })
  }
}

function requestSavePhone() {
  return {
    type: REQUEST_SAVE_PHONE,
    isLoading: true,
  }
}

function receiveSavePhone() {
  return {
    type: RECEIVE_SAVE_PHONE,
    isLoading: false,
    receivedAt: Date.now(),
  }
}

/**
 * Persiste os dados do phone. Se existir id atualiza(PUT),
 * caso contrário cria(POST).
 *
 * @param {Number} id
 * @param {Object} data
 */
export function savePhone(id, data) {
  return (dispatch, getState) => {
    dispatch(requestSavePhone())
    const url = (id) ? `${API_HOST}/phone/${id}` :`${API_HOST}/phone`
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
          err400: 'Erro ao salvar telefone!',
          err401: 'Sessão expirada!',
          err403: 'Sem permisão para salvar telefone!',
          err500: 'Erro ao tentar salvar telefone! Contate o administrador',
          errDefault: 'Erro desconhecido ao salvar telefone!'
        })
      }).then(json => {
        dispatch(receiveSavePhone())
      }).catch(err => {
        dispatch(addToast('error', err.message, null, true))
      })
  }
}

/**
 * Remove um phone por ID.
 *
 * @param {Number} id
 */
export function removePhone(id) {
  return (dispatch, getState) => {
    dispatch(requestSavePhone())
    const url = `${API_HOST}/phone/${id}`
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
          err400: 'Erro ao remover telefone!',
          err401: 'Sessão expirada!',
          err403: 'Sem permisão para remover telefone!',
          err500: 'Erro ao tentar remover telefone! Contate o administrador',
          errDefault: 'Erro desconhecido ao remover telefone!'
        })
      }).then(json => {
        dispatch(receiveSavePhone())
      }).catch(err => {
        dispatch(addToast('error', err.message, null, true))
      })
  }
}