import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  View,
  FlatList
} from 'react-native'

import {
  ReportListItem
} from '~/components'

import styles from './styles'

class ReportList extends Component {
  handlePress = (id) => {
    const { handlePress } = this.props
    handlePress(id)
  }

  renderItem = ({ item }) => {
    return (
      <ReportListItem
        item={item}
        handlePress={(id) => this.handlePress(id)}
      />
    )
  }

  render() {
    const { items } = this.props

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
          </View>
        )}
      </>
    );
  }
}

ReportList.propTypes = {
  items: PropTypes.array,
  handlePress: PropTypes.func.isRequired
}

export default ReportList;
