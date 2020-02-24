import 'react-native-gesture-handler';

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import reducers from './ducks/reducers'
import Routes from './routes'

const store = createStore(reducers, applyMiddleware(thunk, logger));

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
