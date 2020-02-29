import React, { Component } from 'react';

import {
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';

import styles from './styles'

class Constructions extends Component {
  renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.listItem}
    >
      <Text>{`${item.name} ${index}`}</Text>
    </TouchableOpacity>
  )


  render() {
    const { items, hasNextPage } = this.props

    return (
      <>
        {items && items.length > 0 && (
          <FlatList
            data={items}
            extraData={items}
            renderItem={this.renderItem}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={hasNextPage ? this.renderLoader : null}
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

export default Constructions;
