// third party
import { combineReducers } from 'redux'
import { createResponsiveStateReducer } from 'redux-responsive'
// application reducers
import contact from './ContactReducer'
import phone from './PhoneReducer'
import toast from './ToastReducer'

const RootReducer = combineReducers({
  contact,
  phone,
  toast,
  browser: createResponsiveStateReducer({
    extraSmall: 479,
    small: 767,
    medium: 1000,
    large: 1280,
    extraLarge: 1400,
  }),
})

export default RootReducer
