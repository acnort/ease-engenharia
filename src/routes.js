import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import Colors from '~/utils/colors'

import {
  Login,
  ConstructionList,
  ConstructionFloors,
  FloorDetail,
  CreateNewConstruction,
  CreateEditItem
} from '~/pages';

import { screenOptions, tabBarOptions } from '~/utils/navigation'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class Routes extends Component {
  render() {
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
                  <Stack.Navigator
                    screenOptions={{
                      headerMode: 'float',
                      headerTitleAlign: 'center',
                      headerTintColor: Colors.white,
                      headerStyle: {
                        backgroundColor: Colors.darkMain,
                        shadowOpacity: 0,
                        shadowOffset: {
                          height: 0,
                        },
                        shadowRadius: 0,
                        elevation: 0
                      },
                    }}
                  >
                    <Stack.Screen
                      name="ConstructionList"
                      component={ConstructionList}
                      options={{
                        title: 'Obras',
                      }}
                    />
                    <Stack.Screen
                      name="ConstructionFloors"
                      component={ConstructionFloors}
                      options={({ route }) => ({
                        title: route.params ? route.params.construction.title : 'Andares',
                        gestureEnabled: true
                      })}
                    />
                    <Stack.Screen
                      name="FloorDetail"
                      component={FloorDetail}
                      options={({ route }) => ({
                        title: route.params ? route.params.construction.title : 'Andar',
                        gestureEnabled: true
                      })}
                    />
                    <Stack.Screen
                      name="CreateNewConstruction"
                      component={CreateNewConstruction}
                      options={({ route }) => ({
                        title: (route.params && route.params.construction) ? 'Editar Obra' : 'Nova Obra',
                        gestureEnabled: true
                      })}
                    />
                    <Stack.Screen
                      name="CreateEditItem"
                      component={CreateEditItem}
                      options={({ route }) => ({
                        title: (route.params && route.params.item) ? 'Editar Item' : 'Novo Item',
                        gestureEnabled: true
                      })}
                    />
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              {/* <Tab.Screen name="Configurações" component={ConstructionDetail} /> */}
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
