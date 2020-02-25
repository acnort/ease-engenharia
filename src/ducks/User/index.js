import { baseURL } from '~/api'

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
          action.payload.data.name
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

const addUserAction = (user) => (
  {
    type: ADD_USER,
    payload: {
      user
    },
    meta: {
      offline: {
        effect: { url: `${baseURL}/users/${user}`, method: 'GET' },
        commit: { type: ADD_USER_SUCCESS },
        rollback: { type: ADD_USER_ERROR }
      }
    }
  }
)

export const addUser = (user) => (dispatch) => {
  dispatch(addUserAction(user));
}


export default homeReducer
