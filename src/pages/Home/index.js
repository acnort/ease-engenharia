import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { addName } from '../../ducks/Home';

import Container from '../../components/Container'
import styles from './styles'

class Home extends Component {
  handlePress = () => {
    const { addName } = this.props

    addName('Andre')
  };

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
    );
  }
}

const mapStateToProps = (state) => {
  const { friends } = state

  return {
    friends,
  }
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    addName,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
