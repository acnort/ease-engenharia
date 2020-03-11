import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import * as userActions from '~/ducks/User';

import { Container } from '~/components'
import styles from './styles'

class ConstructionDetail extends Component {
  handlePress = () => {
    const { logout } = this.props

    logout()
  }

  render() {
    return (
      <Container>
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handlePress}
            activeOpacity={3}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Container>
    )
  }
}

ConstructionDetail.propTypes = {
  logout: PropTypes.func
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

export default connect(mapStateToProps, mapDispatchToProps)(ConstructionDetail)
