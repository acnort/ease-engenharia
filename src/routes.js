import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ConstructionsList, ConstructionDetail } from '~/pages';
import { screenOptions, tabBarOptions } from '~/utils/navigation'

const Tab = createBottomTabNavigator();

const Routes = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}
    >
      <Tab.Screen
        name="Obras"
        component={ConstructionsList}
      />
      <Tab.Screen name="Configurações" component={ConstructionDetail} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default Routes;
