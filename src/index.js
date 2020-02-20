import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './ducks/reducers'
import Routes from './routes'

const store = createStore(reducers);

class App extends Component {
  handlePress = () => {
    console.warn('opa');
  };

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
