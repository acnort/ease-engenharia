import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from './styles'

class ConstructionForm extends Component {
  render() {
    const {
      onSubmit,
      initialValues
    } = this.props

    return (
      <Formik
        initialValues={initialValues || { title: '', clientName: '' }}
        onSubmit={(values) => onSubmit(values)}
        enableReinitialize
      >
        {({ handleChange, handleSubmit, values }) => (
          <View style={styles.wrapper}>
            <View style={styles.subtitle}><Text>Infos</Text></View>
            <TextInput
              name='title'
              style={styles.input}
              value={values.title}
              placeholder='Nome da Obra'
              textContentType='text'
              keyboardType='default'
              onChangeText={handleChange('title')}
            />
            <TextInput
              name='clientName'
              style={styles.input}
              value={values.clientName}
              placeholder='Nome do Cliente'
              textContentType='text'
              keyboardType='default'
              onChangeText={handleChange('clientName')}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    )
  }
}

ConstructionForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.func
}

export default ConstructionForm
