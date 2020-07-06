// import { RESET_STATE } from '@redux-offline/redux-offline/lib/constants';
import AsyncStorage from '@react-native-community/async-storage';

import api from '~/api'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_ERROR = 'LOGIN_ERROR'
const LOGOUT = 'LOGOUT'

const INITIAL_STATE = {
  data: {},
  error: ''
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state }

    case LOGIN_SUCCESS:
      return {
        data: action.payload,
        error: ''
      }

    case LOGIN_ERROR:
      return {
        data: {},
        error: action.error
      }

    case LOGOUT:
      return {
        data: {},
        error: ''
      }

    default:
      return state
  }
};

const onSignIn = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
  return AsyncStorage.setItem('JWT', token)
}

const onSignOut = () => AsyncStorage.clear()

export const login = (values) => (dispatch) => {
  api.post('/login', values)
    .then(async (resp) => {
      if (resp.data.token) await onSignIn(resp.data.token)

      dispatch({ type: LOGIN_SUCCESS, payload: resp.data })
    })
    .catch((error) => {
      dispatch({ type: LOGIN_ERROR, error: error.response.data })
    })
}

export const logout = () => (dispatch) => {
  onSignOut()
  dispatch({ type: LOGOUT });
}

export default userReducer
