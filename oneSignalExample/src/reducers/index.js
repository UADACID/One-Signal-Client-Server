import { combineReducers } from 'redux'
import { navReducer } from '../navigator'
import DeviceInfo from './notifications/deviceInfo'
import UserReducer from './user'

export default appReducer = combineReducers({
  nav: navReducer,
  DeviceInfo,
  UserReducer
});
