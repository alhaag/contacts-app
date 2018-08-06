import {
  REQUEST_TYPES, RECEIVE_TYPES, REQUEST_SAVE_PHONE, RECEIVE_SAVE_PHONE
} from '../constants/ActionTypes'

const INITIAL_STATE = {
  types: {
    isLoading: true,
    data: {
      rows: [],
      count: 0
    },
    receivedAt: null
  },
  save: {
    isLoading: true,
    receivedAt: null,
  }
}

export default function AvisoReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case REQUEST_TYPES:
      return {
        ...state,
        types: {
          isLoading: action.isLoading,
          data: INITIAL_STATE.types.data,
        }
      }
    case RECEIVE_TYPES:
      return {
        ...state,
        types: {
          isLoading: action.isLoading,
          data: action.data,
          receivedAt: action.receivedAt,
        }
      }
    case REQUEST_SAVE_PHONE:
      return {
        ...state,
        save: {
          isLoading: action.isLoading,
        }
      }
    case RECEIVE_SAVE_PHONE:
      return {
        ...state,
        save: {
          isLoading: action.isLoading,
          receivedAt: action.receivedAt,
        }
      }
    default:
      return state
  }
}
