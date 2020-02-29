import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';

import styles from './styles'

class Constructions extends Component {
  renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.listItem}
    >
      <Text>{`${item.name} ${index}`}</Text>
    </TouchableOpacity>
  )


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
  items: PropTypes.array
}

export default Constructions;
