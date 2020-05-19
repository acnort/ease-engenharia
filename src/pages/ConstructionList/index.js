import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  View
} from 'react-native';

import * as constructionActions from '~/ducks/Construction';

import {
  Container,
  List
} from '~/components'

import styles from './styles'

class ConstructionList extends Component {
  componentDidMount() {
    this.getConstructions()
  }

  handlePress = (construction) => {
    const { navigation: { navigate } } = this.props

    navigate('ConstructionFloors', { construction })
  }

  getConstructions = async () => {
    const { getConstructions } = this.props

    try {
      await getConstructions()
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    const { construction, navigation } = this.props

    return (
      <Container>
        <View style={styles.body}>
          <List
            items={construction.data}
            handlePress={this.handlePress}
            navigation={navigation}
            createButtonAction={() => navigation.navigate('CreateNewConstruction')}
          />
        </View>
      </Container>
    )
  }
}

ConstructionList.propTypes = {
  navigation: PropTypes.object,
  getConstructions: PropTypes.func,
  construction: PropTypes.object
}

const mapStateToProps = ({ construction }) => ({
  construction
})

const mapDispatchToProps = (dispatch) => {
  const { getConstructions } = constructionActions

  return (
    bindActionCreators({
      getConstructions,
    }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstructionList)
