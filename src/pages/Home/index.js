import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import * as homeActions from '../../ducks/Home';

import Container from '../../components/Container'
import styles from './styles'

class Home extends Component {
  handlePress = () => {
    const { addName } = this.props

    addName('Andre')
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

Home.propTypes = {
  addName: PropTypes.func
}

const mapStateToProps = ({ friends }) => ({
  friends
})

const mapDispatchToProps = (dispatch) => {
  const { addName } = homeActions

  return (
    bindActionCreators({
      addName,
    }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
