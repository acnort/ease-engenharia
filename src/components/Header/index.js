import React, { Component } from 'react'

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigationState } from '@react-navigation/native'
import PropTypes from 'prop-types'

import styles from './styles'

class Header extends Component {
  render() {
    const { route } = this.props

    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeftButton}>
          <Icon name='ios-arrow-back' size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{route.routeNames[route.index]}</Text>
      </View>
    );
  }
}

Header.propTypes = {
  route: PropTypes.object
}

export default function (props) {
  const route = useNavigationState((state) => state)

  return <Header {...props} route={route} />
}
