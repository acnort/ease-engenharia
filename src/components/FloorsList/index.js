import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  View,
  FlatList
} from 'react-native'

import {
  CreateButton,
  FloorListItem,
  FloorForm
} from '~/components'

import styles from './styles'

class FloorsList extends Component {
  state = {
    creating: false
  }

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
      <FloorListItem
        navigation={navigation}
        item={item}
        status='hasRisk'
        handlePress={(id) => this.handlePress(id)}
      />
    )
  }

  render() {
    const { items } = this.props
    const { creating } = this.state

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
            {!creating ? (
              <CreateButton
                options={{
                  title: 'Criar andar',
                  handlePress: () => this.setState({ creating: true })
                }}
              />
            ) : (<FloorForm onSubmit={this.handleSubmit} handleCancel={() => this.setState({ creating: false })} />)}
          </View>
        )}
      </>
    );
  }
}

FloorsList.propTypes = {
  constructionId: PropTypes.number.isRequired,
  items: PropTypes.array,
  handlePress: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  navigation: PropTypes.object
}

export default FloorsList;
