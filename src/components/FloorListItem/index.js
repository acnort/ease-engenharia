import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

// import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'

class FloorListItem extends Component {
  state = {
    statusStyle: false
  }

  componentDidMount() {
    const { status } = this.props
    if (status) {
      this.setStatus()
    }
  }

  handlePress = (id) => {
    const { handlePress } = this.props
    handlePress(id)
  }

  setStatus = () => {
    const { status } = this.props

    switch (status) {
      case 'hasRisk':
        return this.setState({ statusStyle: { color: 'red' } })

      default:
        return this.setState({ statusStyle: { color: 'green' } })
    }
  }

  render() {
    const { item } = this.props
    const { statusStyle } = this.state

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => this.handlePress(item.id)}
        >
          <View>
            <Text style={styles.listItemTitle}>{`${item.title}`}</Text>
          </View>
          <View>
            <Text style={[styles.listItemText, statusStyle]}>{`1/17`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

FloorListItem.propTypes = {
  item: PropTypes.object,
  handlePress: PropTypes.func,
  status: PropTypes.string
}

export default FloorListItem;
