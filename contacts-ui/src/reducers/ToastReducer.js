import { CHANGE_TOAST } from 'constants/ActionTypes'

const INITIAL_STATE = {
  toasts: [],
  autohide: true,
}

export default function PacienteReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CHANGE_TOAST:
      return {
        ...state,
        toasts: action.toasts,
        autohide: action.autohide
      }
    default:
      return state
  }
}