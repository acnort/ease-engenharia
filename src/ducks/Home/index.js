import api from '../../api'

const ADD_USER = 'ADD_USER'
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'
const ADD_USER_ERROR = 'ADD_USER_ERROR'

const INITIAL_STATE = {
  users: [
    'Ricardo',
  ],
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state }

    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [
          ...state.users,
          action.payload
        ],
      }

    case ADD_USER_ERROR:
      return {
        ...state,
        error: action.error
      }

    default:
      return state
  }
};

const addUserSuccess = (user) => (
  {
    type: ADD_USER_SUCCESS,
    payload: user
  }
);

const addUserError = (error) => (
  {
    type: ADD_USER_ERROR,
    error
  }
);

export const addUser = () => (dispatch) => {
  dispatch({ type: ADD_USER })

  api.get('users/arojunior')
    .then((resp) => {
      dispatch(addUserSuccess(resp.data.name))
    })
    .catch((error) => {
      dispatch(addUserError(error))
    })
}


export default homeReducer
