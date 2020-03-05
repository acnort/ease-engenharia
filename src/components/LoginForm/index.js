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

class LoginForm extends Component {
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
            <TextInput
              style={styles.input}
              value={values.email}
              placeholder='Email'
              textContentType='emailAddress'
              keyboardType='email-address'
              onChangeText={handleChange('email')}
            />

            <TextInput
              style={styles.input}
              value={values.password}
              placeholder='Senha'
              textContentType='password'
              secureTextEntry
              onChangeText={handleChange('password')}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    )
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func
}

export default LoginForm
