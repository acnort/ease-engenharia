import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  View,
  Text,
  FlatList
} from 'react-native'

import {
  CreateButton,
  PhotoListItem,
  FloorForm
} from '~/components'

import styles from './styles'

class PhotosList extends Component {
  handlePress = (id) => {
    const { handlePress } = this.props
    handlePress(id)
  }

  handleSubmit = (values) => {
    const { constructionId, handleSubmit } = this.props
    handleSubmit(constructionId, values)
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props

    return (
      <PhotoListItem
        navigation={navigation}
        item={item}
        isOk={false}
        handlePress={(id) => this.handlePress(id)}
      />
    )
  }

  render() {
    const { items, title, navigation } = this.props
    console.warn(this.props)
    return (
      <>
        {items && (
          <View style={styles.list}>
            <Text style={styles.title}>{title}</Text>
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
                title: 'Adicionar item',
                handlePress: this.handlePress
              }}
            />
          </View>
        )}
      </>
    );
  }
}

PhotosList.propTypes = {
  constructionId: PropTypes.number.isRequired,
  items: PropTypes.array,
  title: PropTypes.string,
  handlePress: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  navigation: PropTypes.object
}

export default PhotosList;
