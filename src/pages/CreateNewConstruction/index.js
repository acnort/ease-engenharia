import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';

import {
  View,
} from 'react-native';

import * as userActions from '~/ducks/User';

import { Container, ConstructionForm } from '~/components'
import styles from './styles'

class CreateNewConstruction extends Component {
  onSubmit = () => {
    console.warn('cria construçao')
  }

  render() {
    return (
      <Container>
        <View style={styles.body}>
          <ConstructionForm
            onSubmit={this.onSubmit}
          />
        </View>
      </Container>
    )
  }
}

CreateNewConstruction.propTypes = {

}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = (dispatch) => {
  const { logout } = userActions

  return (
    bindActionCreators({
      logout,
    }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewConstruction)
