import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  View
} from 'react-native';

import * as itemActions from '~/ducks/Floor';

import { Container, ReportList } from '~/components'
import styles from './styles'
import createReport from './pdfTemplate'

class Reports extends Component {
  componentDidMount() {
    const { route } = this.props

    if (route.params && route.params.construction.id && route.params.id) {
      // this.getFloors(route.params.construction.id)
    }
  }

  handlePress = (id) => {
    createReport()
    console.warn('download', id)
  }

  render() {
    return (
      <Container>
        <View style={styles.body}>
          <ReportList
            items={[
              {
                file: '',
                date: '25/05/2020'
              }
            ]}
            handlePress={this.handlePress}
          />
        </View>
      </Container>
    )
  }
}

Reports.propTypes = {
  route: PropTypes.object
}

const mapStateToProps = ({ user, floor }) => ({
  user,
  floor
})

const mapDispatchToProps = (dispatch) => {
  const { getItems, createItem } = itemActions

  return (
    bindActionCreators({
      getItems,
      createItem
    }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
