import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'

class CreateButton extends Component {
  render() {
    const { options: { title, handlePress } } = this.props

    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={handlePress}
      >
        <Text style={styles.listItemText}>{title}</Text>
        <Icon style={styles.icon} name='md-add' size={20} />
      </TouchableOpacity>
    );
  }
}

CreateButton.propTypes = {
  options: PropTypes.object
}

export default CreateButton;
