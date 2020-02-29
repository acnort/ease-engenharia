import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  View,
  Animated,
  Dimensions
} from 'react-native';

import {
  LoginForm
} from '~/components'

import styles from './styles'

class Login extends Component {
  state = {
    logoAnimation: new Animated.Value(0),
    formAnimation: new Animated.Value(0),
    backgroundAnimation: new Animated.Value(0),
    backgroundAnimation2: new Animated.Value(0),
    backgroundAnimation3: new Animated.Value(0),
  }

  componentDidMount() {
    const {
      logoAnimation,
      formAnimation,
      backgroundAnimation,
      backgroundAnimation2,
      backgroundAnimation3
    } = this.state

    this.animate(logoAnimation, 400, 800).start()
    this.animate(backgroundAnimation3, 400, 1000).start()
    this.animate(backgroundAnimation2, 400, 1200).start()
    this.animate(backgroundAnimation, 400, 1400).start()
    this.animate(formAnimation, 400, 1400).start()
  }

  animate = (animation, duration = 200, delay = 0, toValue = 1) => (
    Animated.timing(animation, {
      toValue,
      delay,
      duration,
      useNativeDriver: true
    })
  )

  render() {
    const {
      logoAnimation,
      formAnimation,
      backgroundAnimation,
      backgroundAnimation2,
      backgroundAnimation3
    } = this.state

    const windowHeight = Dimensions.get('window').height;
    const loginRef = windowHeight / 20

    const logoAnimatedStyle = {
      transform: [{
        translateY: logoAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [windowHeight / 8, 0]
        })
      }]
    }

    const formAnimatedStyle = {
      opacity: formAnimation
    }

    const backgroundAnimatedStyle = {
      opacity: backgroundAnimation,
      transform: [
        { translateX: '-50%' },
        {
          translateY: backgroundAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -loginRef]
          })
        }
      ]
    }

    const backgroundAnimatedStyle2 = {
      opacity: backgroundAnimation2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.55]
      }),
      transform: [
        { translateX: '-50%' },
        {
          translateY: backgroundAnimation2.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -(loginRef + 40)]
          })
        }
      ]
    }

    const backgroundAnimatedStyle3 = {
      opacity: backgroundAnimation3.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.55]
      }),
      transform: [
        { translateX: '-50%' },
        {
          translateY: backgroundAnimation3.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -(loginRef + 80)]
          })
        }
      ]
    }

    return (
      <View style={styles.body}>
        <Animated.View style={[styles.background, backgroundAnimatedStyle3]} />
        <Animated.View style={[styles.background, backgroundAnimatedStyle2]} />
        <Animated.View style={[styles.background, backgroundAnimatedStyle]} />

        <Animated.Image
          source={require('~/assets/img/ease.png')}
          style={[styles.logo, logoAnimatedStyle]}
          resizeMode='contain'
        />

        <Animated.View style={formAnimatedStyle}>
          <LoginForm style={styles.form} />
        </Animated.View>
      </View>
    )
  }
}

Login.propTypes = {

}

const mapStateToProps = ({ construction }) => ({
  construction
})

const mapDispatchToProps = (dispatch) => {
  // const { getConstructions } = constructionActions

  return (
    bindActionCreators({
      // getConstructions,
    }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
