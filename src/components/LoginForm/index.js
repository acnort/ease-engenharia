import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import {
  View,
  TextInput,
  Button
} from 'react-native';

import styles from './styles'

class LoginForm extends Component {
  render() {
    const {
      values: { email, password },
      handleSubmit,
      setFieldValue,
      style
    } = this.props

    return (
      <View style={[style, styles.body]}>
        <View style={styles.container}>
          <TextInput
            value={email}
            onChangeText={(text) => setFieldValue('email', text)}
          />

          <TextInput
            value={password}
            onChangeText={(text) => setFieldValue('password', text)}
          />

          <Button
            onPress={handleSubmit}
            title="Login"
          />
        </View>
      </View>
    )
  }
}

LoginForm.propTypes = {
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  style: PropTypes.object
}

export default withFormik({
  mapPropsToValues: () => ({ email: 'oi', password: 'af' }),

  handleSubmit: (values) => {
    console.log(values);
  }
})(LoginForm)
