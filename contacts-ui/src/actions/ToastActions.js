// third party
import { CHANGE_TOAST } from '../constants/ActionTypes'

function changeToast(toasts, autohide) {
  return {
    type: CHANGE_TOAST,
    toasts: toasts,
    autohide: autohide,
  }
}

export function addToast(type, text, action, autohide = true) {
  return (dispatch, getState) => {
    const state =  getState()
    const toasts = state.toast.toasts.slice()
    toasts.push({
      type: type,
      text: text,
      action: action,
    })
    return dispatch(changeToast(toasts, autohide))
  }
}

export function dismissToast() {
  return (dispatch, getState) => {
    const state =  getState()
    const [, ...toasts] = state.toast.toasts
    return dispatch(changeToast(toasts, true))
  }
}
