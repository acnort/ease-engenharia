import React, { Component } from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import styles from './styles'

class Container extends Component {
  handlePress = () => {
    console.warn('opa');
  };

  render() {
    const { children } = this.props
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.content}
          >
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            {children}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default Container;
