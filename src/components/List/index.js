import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  FlatList
} from 'react-native'

import {
  CreateButton,
  ListItem
} from '~/components'

import styles from './styles'

class List extends Component {
  handlePress = (item) => {
    const { handlePress } = this.props
    handlePress(item)
  }

  renderItem = ({ item, index }) => {
    const { items, createButtonAction } = this.props

    if (index === items.length - 1) {
      return (
        <CreateButton
          options={{
            title: 'Nova Obra',
            handlePress: () => createButtonAction()
          }}
        />
      )
    }
    return (
      <ListItem item={item} handlePress={(construction) => this.handlePress(construction)} />
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

List.propTypes = {
  items: PropTypes.array,
  handlePress: PropTypes.func,
  createButtonAction: PropTypes.func,
}

export default List;
