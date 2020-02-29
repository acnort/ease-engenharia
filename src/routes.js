import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Login,
  ConstructionsList,
  ConstructionDetail
} from '~/pages';

import { screenOptions, tabBarOptions } from '~/utils/navigation'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const isLogged = true

const Routes = () => (
  <NavigationContainer>
    {isLogged ? (
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
);

export default Routes;
