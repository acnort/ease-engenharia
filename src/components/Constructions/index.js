import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'

class Constructions extends Component {
  handlePress = () => {
    const { handlePress } = this.props
    handlePress()
  }

  renderItem = ({ item, index }) => {
    console.warn(item)
    return (
      <TouchableOpacity
        style={[styles.listItem, {
          borderLeftWidth: 6,
          borderLeftColor: '#000'
        }]}
        onPress={this.handlePress}
      >
        <Text>{`${item.name} ${index}`}</Text>
        <Icon name='md-open' size={20} />
      </TouchableOpacity>
    )
  }


  render() {
    const { items } = this.props

    return (
      <>
        {items && items.length > 0 && (
          <FlatList
            data={items}
            extraData={items}
            keyExtractor={(item) => `${item.id}`}
            renderItem={this.renderItem}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={hasNextPage ? this.renderLoader : null}
            ListFooterComponentStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            style={styles.list}
          />
        )}
      </>
    );
  }
}

Constructions.propTypes = {
  items: PropTypes.array,
  handlePress: PropTypes.func
}

export default Constructions;
