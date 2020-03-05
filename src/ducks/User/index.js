import { RESET_STATE } from "@redux-offline/redux-offline/lib/constants";
import api from '~/api'
import { AsyncStorage } from "react-native";

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_ERROR = 'LOGIN_ERROR'

const INITIAL_STATE = {
  user: {}
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

    default:
      return state
  }
};

const onSignIn = (token) => AsyncStorage.setItem('TOKEN_KEY', token)

const onSignOut = () => AsyncStorage.removeItem('TOKEN_KEY')

export const login = (values) => (dispatch) => {
  // dispatch({ type: RESET_STATE });

  api.post('/login', values)
    .then((resp) => {
      dispatch({ type: LOGIN_SUCCESS, payload: resp.data })

      if (resp.data.jwt) onSignIn()
    })
    .catch((error) => {
      dispatch({ type: LOGIN_ERROR, error: error.response.data })
    })
}

export const logout = () => {
  onSignOut()
}

export default userReducer
