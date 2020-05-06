import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  View,
} from 'react-native';

import * as constructionActions from '~/ducks/Construction';

import { Container, ConstructionForm } from '~/components'
import styles from './styles'

class CreateNewConstruction extends Component {
  state = {
    initialValues: false
  }

  componentDidMount() {
    const { route } = this.props

    if (route.params && route.params.construction) {
      this.setState({ initialValues: route.params.construction })
    }
  }

  onSubmit = (values) => {
    const {
      createConstruction,
      editConstruction,
      navigation: { navigate },
      route
    } = this.props

    if (route.params && route.params.construction) {
      editConstruction(values)
    } else {
      createConstruction(values)
    }

    navigate('ConstructionList')
  }

  render() {
    const { initialValues } = this.state
    return (
      <Container>
        <View style={styles.body}>
          <ConstructionForm
            initialValues={initialValues}
            onSubmit={this.onSubmit}
          />
        </View>
      </Container>
    )
  }
}

CreateNewConstruction.propTypes = {
  createConstruction: PropTypes.func.isRequired,
  editConstruction: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = (dispatch) => {
  const { createConstruction, editConstruction } = constructionActions

  return (
    bindActionCreators({
      createConstruction,
      editConstruction,
    }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewConstruction)
