import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';

import {
  Login,
  ConstructionList,
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

  render() {
    const { isLogged } = this.state
    const { user: { data: { token } } } = this.props

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
              {/* <Tab.Screen name="Obras" component={ConstructionsList} /> */}
              <Tab.Screen name="Obras">
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen name="ConstructionList" component={ConstructionList} />
                    <Stack.Screen name="ConstructionDetail" component={ConstructionDetail} />
                  </Stack.Navigator>
                )}
              </Tab.Screen>
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
