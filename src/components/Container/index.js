import React, { Component } from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import PropTypes from 'prop-types';

import Colors from '~/utils/colors'

// import { Header } from '~/components'

import styles from './styles'

class Container extends Component {
  render() {
    const { children, hasScrollView } = this.props

    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.darkMain}
        />
        <SafeAreaView style={styles.safeAreaView}>
          {/* <Header /> */}
          {hasScrollView ? (
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              contentContainerStyle={styles.content}
            >
              {children}
            </ScrollView>
          )
            : (
              <View style={styles.content}>
                {children}
              </View>
            )}
        </SafeAreaView>
      </>
    );
  }
}

Container.propTypes = {
  children: PropTypes.object,
  hasScrollView: PropTypes.bool
}

export default Container;
