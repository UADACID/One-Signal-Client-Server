import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import appReducer from '../reducers'

// const middleware = createReactNavigationReduxMiddleware(
//   "root",
//   state => state.nav,
// );

export default store = createStore(
  appReducer,
  applyMiddleware(thunk),
);
