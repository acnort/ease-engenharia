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
    const { addUser } = this.props

    addUser('arojunior')
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
            <Text style={styles.buttonText}>Ação</Text>
          </TouchableOpacity>
        </View>
      </Container>
    )
  }
}

ConstructionDetail.propTypes = {
  addUser: PropTypes.func
}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = (dispatch) => {
  const { addUser } = userActions

  return (
    bindActionCreators({
      addUser,
    }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstructionDetail)
