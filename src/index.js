import 'react-native-gesture-handler';

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import { effect, discard } from './api'

import reducers from './ducks/reducers'
import Routes from './routes'

const store = createStore(
  reducers,
  compose(
    offline({
      ...offlineConfig,
      effect,
      discard
    }),
    applyMiddleware(thunk, logger)
  )
);

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
