import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import {
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'

class FloorForm extends Component {
  render() {
    const {
      onSubmit,
      handleCancel,
      initialValues
    } = this.props

    return (
      <Formik
        initialValues={initialValues || { title: '' }}
        onSubmit={(values) => onSubmit(values)}
        enableReinitialize
      >
        {({ handleChange, handleSubmit, values }) => (
          <View style={styles.wrapper}>
            <TextInput
              name='title'
              style={styles.input}
              value={values.title}
              placeholder='Nome do Andar'
              textContentType='text'
              keyboardType='default'
              onChangeText={handleChange('title')}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleCancel()}
            >
              <Icon style={styles.icon} name='md-close' size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lastButton}
              onPress={handleSubmit}
            >
              <Icon style={styles.lastIcon} name='md-add' size={20} />
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    )
  }
}

FloorForm.propTypes = {
  onSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
  initialValues: PropTypes.object
}

export default FloorForm
