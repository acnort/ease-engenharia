import React, { Component } from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { Header } from '~/components'

import styles from './styles'

class Container extends Component {
  render() {
    const { children, hasScrollView } = this.props
    console.warn(children)
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <Header />
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

export default Container;
