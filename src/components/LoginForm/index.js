import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

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
      values: { email, password },
      handleSubmit,
      setFieldValue
    } = this.props

    return (
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder='Email'
          onChangeText={(text) => setFieldValue('email', text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder='Senha'
          onChangeText={(text) => setFieldValue('password', text)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

LoginForm.propTypes = {
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func
}

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),

  handleSubmit: (values) => {
    console.log(values);
  }
})(LoginForm)
