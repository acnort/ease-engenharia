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
  Constructions
} from '~/components'

import styles from './styles'

class ConstructionList extends Component {
  componentDidMount() {
    this.getConstructions()
  }

  handlePress = () => {
    const { navigation: { navigate } } = this.props
    console.warn(this.props)
    navigate('ConstructionDetail')
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
    const { construction } = this.props
    console.warn(construction)
    return (
      <Container>
        <View style={styles.body}>
          <Constructions items={construction.list} handlePress={this.handlePress} />
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