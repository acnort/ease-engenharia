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

class Item extends Component {
  render() {
    const {
      onSubmit,
      initialValues
    } = this.props

    const initial = {
      title: '',
      observation: '',
      rating: ''
    }

    return (
      <Formik
        initialValues={initialValues || initial}
        onSubmit={(values) => onSubmit(values)}
        enableReinitialize
      >
        {({ handleChange, handleSubmit, values }) => (
          <View style={styles.wrapper}>
            <TextInput
              name='title'
              style={styles.input}
              value={values.title}
              placeholder='Legenda'
              textContentType='text'
              keyboardType='default'
              onChangeText={handleChange('title')}
            />
            <TextInput
              name='observation'
              style={styles.input}
              value={values.observation}
              placeholder='Observação'
              textContentType='text'
              keyboardType='default'
              onChangeText={handleChange('observation')}
            />
            <TextInput
              name='rating'
              style={styles.input}
              value={values.rating}
              placeholder='Risco'
              textContentType='text'
              keyboardType='default'
              onChangeText={handleChange('rating')}
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

Item.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object
}

export default Item
