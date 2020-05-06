import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  FlatList,
  View
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

  renderItem = ({ item }) => {
    const { navigation } = this.props

    return (
      <ListItem
        navigation={navigation}
        item={item}
        handlePress={(construction) => this.handlePress(construction)}
        status='hasRisk'
      />
    )
  }

  render() {
    const { items, createButtonAction } = this.props

    return (
      <>
        {items && (
          <View style={styles.list}>
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
            />
            <CreateButton
              options={{
                title: 'Nova Obra',
                handlePress: () => createButtonAction()
              }}
            />
          </View>
        )}
      </>
    );
  }
}

List.propTypes = {
  items: PropTypes.array,
  navigation: PropTypes.object.isRequired,
  handlePress: PropTypes.func,
  createButtonAction: PropTypes.func,
}

export default List;
