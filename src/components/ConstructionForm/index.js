import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {
  FloorsList
} from '~/components'

import styles from './styles'

class ConstructionForm extends Component {
  render() {
    const {
      onSubmit
    } = this.props

    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View style={styles.wrapper}>
            <View style={styles.subtitle}><Text>Infos</Text></View>
            <TextInput
              style={styles.input}
              value={values.email}
              placeholder='Nome da Obra'
              textContentType='text'
              keyboardType='text'
              onChangeText={handleChange('constructionName')}
            />
            <TextInput
              style={styles.input}
              value={values.email}
              placeholder='Nome do Cliente'
              textContentType='text'
              keyboardType='text'
              onChangeText={handleChange('clientName')}
            />
            <View style={styles.subtitle}><Text>Andares</Text></View>
            <FloorsList
              items={[
                {
                  name: 'Andar 1',
                },
                {
                  name: 'Andar 2',
                },
                {
                  name: 'Andar 3',
                }
              ]}
              handlePress={this.handlePress}
            // navigation={navigation}
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
  onSubmit: PropTypes.func
}

export default ConstructionForm
