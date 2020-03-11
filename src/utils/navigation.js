/* eslint-disable react/prop-types */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { StyleSheet, Platform } from 'react-native'

import Colors from '~/utils/colors';

export const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;

    switch (route.name) {
      case 'Obras':
        iconName = 'ios-list'
        break;

      case 'Configurações':
        iconName = 'ios-cog'
        break;

      default:
        break;
    }

    return <Icon name={iconName} size={size} color={color} />;
  }
})

const styles = {
  ios: StyleSheet.create({
    height: 100,
    paddingTop: 10
  }),
  android: StyleSheet.create({
    height: 80,
    paddingTop: 10,
    paddingBottom: 15
  })
}

export const tabBarOptions = {
  activeTintColor: Colors.darkMain,
  inactiveTintColor: Colors.lightGray,
  style: Platform.iOS ? styles.ios : styles.android
}
/* eslint-enable react/prop-types */
