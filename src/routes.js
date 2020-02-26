import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ConstructionsList from '~/pages/ConstructionsList';
import { screenOptions, tabBarOptions } from '~/utils/navigation'

const Tab = createBottomTabNavigator();

const Routes = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}
      tabBarVisible
    >
      <Tab.Screen name="Obras" component={ConstructionsList} />
      <Tab.Screen name="Logout" component={ConstructionsList} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default Routes;
