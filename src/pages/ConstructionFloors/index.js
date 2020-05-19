import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  View,
} from 'react-native';

import * as floorActions from '~/ducks/Floor';

import { Container, FloorsList } from '~/components'
import styles from './styles'

class ConstructionFloors extends Component {
  componentDidMount() {
    const { route } = this.props

    if (route.params && route.params.construction.id) {
      this.getFloors(route.params.construction.id)
    }
  }

  getFloors = async (id) => {
    const { getFloors } = this.props

    try {
      await getFloors(id)
    } catch (err) {
      console.warn(err)
    }
  }

  handlePress = (id) => {
    const { route, navigation } = this.props
    const { params: { construction } } = { ...route }

    navigation.navigate('FloorDetail', { id, construction })
  }

  submitFloor = async (id, values) => {
    const { route, createFloor } = this.props

    try {
      await createFloor(id, values)
      this.getFloors(route.params.construction.id)
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    const { route, floor, navigation } = this.props

    return (
      <Container>
        <View style={styles.body}>
          {floor.data && (
            <FloorsList
              constructionId={route.params.construction.id}
              items={floor.data}
              handleSubmit={this.submitFloor}
              handlePress={this.handlePress}
              navigation={navigation}
            />
          )}
        </View>
      </Container>
    )
  }
}

ConstructionFloors.propTypes = {
  route: PropTypes.object,
  floor: PropTypes.object,
  navigation: PropTypes.object,
  getFloors: PropTypes.func,
  createFloor: PropTypes.func
}

const mapStateToProps = ({ user, floor }) => ({
  user,
  floor
})

const mapDispatchToProps = (dispatch) => {
  const { getFloors, createFloor } = floorActions

  return (
    bindActionCreators({
      getFloors,
      createFloor
    }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstructionFloors)
