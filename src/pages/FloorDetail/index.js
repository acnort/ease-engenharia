import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  View,
  Text
} from 'react-native';

import * as floorActions from '~/ducks/Floor';

import { Container } from '~/components'
import styles from './styles'

class FloorDetail extends Component {
  componentDidMount() {
    const { route } = this.props
    console.warn(route)
    if (route.params && route.params.construction.id) {
      // this.getFloors(route.params.construction.id)
    }
  }

  render() {
    // const { route, floor, navigation } = this.props

    return (
      <Container>
        <View style={styles.body}>
          <Text>Listagem de Fotos</Text>
        </View>
      </Container>
    )
  }
}

FloorDetail.propTypes = {
  route: PropTypes.object,
  floor: PropTypes.object,
  navigation: PropTypes.object
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

export default connect(mapStateToProps, mapDispatchToProps)(FloorDetail)
