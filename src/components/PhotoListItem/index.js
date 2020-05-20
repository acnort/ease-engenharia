import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Colors from '~/utils/colors'

import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'

class PhotoListItem extends Component {
  state = {
    statusStyle: false
  }

  componentDidMount() {
    this.setStatus()
  }

  handlePress = (id) => {
    const { handlePress } = this.props
    handlePress(id)
  }

  setStatus = () => {
    const { item } = this.props

    switch (item.risk) {
      case 2:
        return this.setState({ statusStyle: { color: Colors.warning } })

      case 3:
        return this.setState({ statusStyle: { color: Colors.warning } })

      case 4: {
        console.warn(item.risk)
        return this.setState({ statusStyle: { color: Colors.danger } })
      }

      case 5: {
        console.warn(item.risk)
        return this.setState({ statusStyle: { color: Colors.danger } })
      }

      default:
        return this.setState({ statusStyle: { color: Colors.lightMain } })
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
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={{ uri: 'https://specials-images.forbesimg.com/imageserve/5c0077cc31358e5b43383ffc/960x0.jpg?fit=scale' }}
            />
          </View>
          <View style={styles.infoWrapper}>
            <View>
              <Text style={styles.infoTitle}>{item.subtitle}</Text>
              <Text style={[styles.infoObs]}>{item.obs}</Text>
            </View>
            <View style={styles.infoRight}>
              <Text style={[styles.infoRisk, statusStyle]}>{item.risk}</Text>
              <Text>
                {item.valid && <Icon style={styles.okIcon} name='md-checkmark' size={20} /> }
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

PhotoListItem.propTypes = {
  item: PropTypes.object,
  isOK: PropTypes.bool.isRequired,
  handlePress: PropTypes.func,
  status: PropTypes.string
}

export default PhotoListItem;
