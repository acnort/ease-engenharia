import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

// import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'

class ListItem extends Component {
  state = {
    menuOpened: false,
    statusStyle: false
  }

  componentDidMount() {
    const { status } = this.props
    if (status) {
      this.setStatus()
    }
  }

  handlePress = (item) => {
    const { handlePress } = this.props
    handlePress(item)
  }

  setStatus = () => {
    const { status } = this.props

    switch (status) {
      case 'hasRisk':
        return this.setState({ statusStyle: { backgroundColor: 'red' } })

      default:
        return this.setState({ statusStyle: { backgroundColor: 'green' } })
    }
  }

  render() {
    const { item, status, navigation } = this.props
    const { menuOpened, statusStyle } = this.state

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => this.setState({ menuOpened: !menuOpened })}
        >
          <View>
            <Text style={styles.listItemTitle}>{`${item.title}`}</Text>
            <Text style={styles.listItemText}>{item.clientName}</Text>
            {item.floors && (
              <Text style={styles.listItemText}>{`${item.floors} Andares`}</Text>
            )}
          </View>
          {status && statusStyle && (
            <View
              style={[
                styles.status,
                statusStyle
              ]}
            />
          )}
        </TouchableOpacity>

        {menuOpened && (
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('CreateNewConstruction', { construction: item })}
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
              onPress={() => navigation.navigate('CreateNewConstruction', { construction: item })}
            >
              <Text style={styles.menuItemText}>Relatórios</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  handlePress: PropTypes.func,
  status: PropTypes.string
}

export default ListItem;
