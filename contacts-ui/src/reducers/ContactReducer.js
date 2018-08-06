import {
  REQUEST_CONTACTS, RECEIVE_CONTACTS, REQUEST_CONTACT, RECEIVE_CONTACT, REQUEST_SAVE_CONTACT, RECEIVE_SAVE_CONTACT,
  REQUEST_CONTACT_GROUPS, RECEIVE_CONTACT_GROUPS, RESET_CONTACT
} from '../constants/ActionTypes'

const INITIAL_STATE = {
  groups: {
    isLoading: true,
    data: {
      rows: [],
      count: 0
    },
    receivedAt: null,
  },
  list: {
    isLoading: true,
    data: {
      rows: [],
      count: 0,
      page: 1,
      limit: 50,
    },
    receivedAt: null,
  },
  item: {
    isLoading: false,
    data: {},
    receivedAt: null,
  },
  save: {
    isLoading: true,
    receivedAt: null,
  }
}

export default function AvisoReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case REQUEST_CONTACT_GROUPS:
      return {
        ...state,
        groups: {
          isLoading: action.isLoading,
          data: INITIAL_STATE.groups.data,
        }
      }
    case RECEIVE_CONTACT_GROUPS:
      return {
        ...state,
        groups: {
          isLoading: action.isLoading,
          data: action.data,
          receivedAt: action.receivedAt,
        }
      }
    case REQUEST_CONTACTS:
      return {
        ...state,
        list: {
          isLoading: action.isLoading,
          data: INITIAL_STATE.list.data,
        }
      }
    case RECEIVE_CONTACTS:
      return {
        ...state,
        list: {
          isLoading: action.isLoading,
          data: action.data,
          receivedAt: action.receivedAt,
        }
      }
    case REQUEST_CONTACT:
      return {
        ...state,
        item: {
          isLoading: action.isLoading,
          data: INITIAL_STATE.item.data,
        }
      }
    case RECEIVE_CONTACT:
      return {
        ...state,
        item: {
          isLoading: action.isLoading,
          data: action.data,
          receivedAt: action.receivedAt,
        }
      }
    case REQUEST_SAVE_CONTACT:
      return {
        ...state,
        save: {
          isLoading: action.isLoading,
        }
      }
    case RECEIVE_SAVE_CONTACT:
      return {
        ...state,
        save: {
          isLoading: action.isLoading,
          receivedAt: action.receivedAt,
        }
      }
    case RESET_CONTACT:
      return {
        ...state,
        item: INITIAL_STATE.item,
      }
    default:
      return state
  }
}