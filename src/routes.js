import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';

import {
  Login,
  ConstructionsList,
  ConstructionDetail
} from '~/pages';

import { screenOptions, tabBarOptions } from '~/utils/navigation'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class Routes extends Component {
  state = {
    isLogged: false
  }

  componentDidMount() {
    this.getJWT()
  }

  getJWT = async () => {
    const jwt = await AsyncStorage.getItem('JWT')

    this.setState({ isLogged: jwt })
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.warn(props, state)
  //   if (props.user.data.token !== state.isLogged) {
  //     console.warn(1)
  //     return {
  //       isLogged: props.user.token
  //     }
  //   }

  //   return null
  // }

  render() {
    const { isLogged } = this.state
    const { token } = this.props.user.data
    console.warn(token)
    return (
      <NavigationContainer>
        {!token ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen
              name="Login"
              component={Login}
            />
          </Stack.Navigator>
        )
          : (
            <Tab.Navigator
              screenOptions={screenOptions}
              tabBarOptions={tabBarOptions}
            >
              <Tab.Screen name="Obras" component={ConstructionsList} />
              <Tab.Screen name="Configurações" component={ConstructionDetail} />
            </Tab.Navigator>
          )}
      </NavigationContainer>
    )
  }
}

Routes.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = ({ user }) => ({
  user
})

export default connect(mapStateToProps)(Routes)
