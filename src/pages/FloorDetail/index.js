import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  View
} from 'react-native';

import * as itemActions from '~/ducks/Floor';

import { Container, PhotosList } from '~/components'
import styles from './styles'

class FloorDetail extends Component {
  componentDidMount() {
    const { route } = this.props

    if (route.params && route.params.construction.id && route.params.id) {
      // this.getFloors(route.params.construction.id)
    }
  }

  handlePress = (id) => {
    const { route, navigation } = this.props
    const { params: { item } } = { ...route }

    navigation.navigate('CreateEditItem', { id, item })
  }

  render() {
    const { floor, navigation } = this.props

    return (
      <Container>
        <View style={styles.body}>
          <PhotosList
            title={floor.title || 'Nome do Andar'}
            items={[
              {
                image: 'https://specials-images.forbesimg.com/imageserve/5c0077cc31358e5b43383ffc/960x0.jpg?fit=scale',
                subtitle: 'Legenda',
                obs: 'observação',
                risk: 5,
                valid: false
              },
              {
                image: 'https://specials-images.forbesimg.com/imageserve/5c0077cc31358e5b43383ffc/960x0.jpg?fit=scale',
                subtitle: 'Legenda 2',
                obs: 'observação 2',
                risk: 1,
                valid: true
              }
            ]}
            handleSubmit={this.submitFloor}
            handlePress={this.handlePress}
            navigation={navigation}
          />
        </View>
      </Container>
    )
  }
}

FloorDetail.propTypes = {
  route: PropTypes.object,
  floor: PropTypes.object,
  navigation: PropTypes.object,
}

const mapStateToProps = ({ user, floor }) => ({
  user,
  floor
})

const mapDispatchToProps = (dispatch) => {
  const { getItems, createItem } = itemActions

  return (
    bindActionCreators({
      getItems,
      createItem
    }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FloorDetail)
