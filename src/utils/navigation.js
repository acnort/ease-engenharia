/* eslint-disable react/prop-types */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '~/utils/colors';

export const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;

    switch (route.name) {
      case 'Obras':
        iconName = 'ios-list'
        break;

      case 'Logout':
        iconName = 'ios-exit'
        break;

      default:
        break;
    }

    return <Icon name={iconName} size={size} color={color} />;
  }
})

export const tabBarOptions = {
  activeTintColor: Colors.darkMain,
  inactiveTintColor: Colors.lightGray,
  style: {
    height: 100,
    paddingTop: 10
  }
}
/* eslint-enable react/prop-types */
