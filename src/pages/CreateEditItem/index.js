import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  View,
} from 'react-native';

import * as itemActions from '~/ducks/Item';

import { Container, ItemForm } from '~/components'
import styles from './styles'

class CreateEditItem extends Component {
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
      createItem,
      editItem,
      navigation: { navigate },
      route
    } = this.props

    if (route.params && route.params.construction) {
      editItem(values)
    } else {
      createItem(values)
    }

    navigate('ItemList')
  }

  render() {
    const { initialValues } = this.state
    return (
      <Container>
        <View style={styles.body}>
          <ItemForm
            initialValues={initialValues}
            onSubmit={this.onSubmit}
          />
        </View>
      </Container>
    )
  }
}

CreateEditItem.propTypes = {
  createItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = (dispatch) => {
  const { createItem, editItem } = itemActions

  return (
    bindActionCreators({
      createItem,
      editItem,
    }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditItem)
