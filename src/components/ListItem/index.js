import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'

class ListItem extends Component {
  state = {
    menuOpened: false
  }

  handlePress = (item) => {
    const { handlePress } = this.props
    handlePress(item)
  }

  render() {
    const { item } = this.props
    const { menuOpened } = this.state

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => this.setState({ menuOpened: !menuOpened })}
        >
          <View>
            <Text style={styles.listItemTitle}>{`${item.name}`}</Text>
            {/* <Text style={styles.listItemText}>{`${item.floors} Andares`}</Text> */}
            <Text style={styles.listItemText}>20 Andares</Text>
          </View>
          <Icon style={styles.icon} name='md-open' size={20} />
        </TouchableOpacity>

        {menuOpened && (
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => this.handlePress(item)}
            >
              <Text style={styles.menuItemText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.menuItem, {
                backgroundColor: '#eee'
              }]}
              onPress={() => this.handlePress(item)}
            >
              <Text style={styles.menuItemText}>Andares</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => this.handlePress(item)}
            >
              <Text style={styles.menuItemText}>Baixar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object,
  handlePress: PropTypes.func
}

export default ListItem;
