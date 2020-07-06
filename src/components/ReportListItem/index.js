import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'

class ReportListItem extends Component {
  downloadReport = (item) => {
    const { handlePress } = this.props
    handlePress(item.id)
  }

  render() {
    const { item } = this.props

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.listItem}
          onPress={this.downloadReport}
        >
          <View>
            <Icon style={styles.icon} name='md-close' size={20} />
            {item.date && (
              <Text style={styles.listItemText}>{item.date}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

ReportListItem.propTypes = {
  item: PropTypes.object,
  handlePress: PropTypes.func,
}

export default ReportListItem;
