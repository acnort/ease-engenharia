import api from '~/api'
import * as token from '~/utils/token'

const GET_CONSTRUCTIONS = 'GET_CONSTRUCTIONS'
const GET_CONSTRUCTIONS_SUCCESS = 'GET_CONSTRUCTIONS_SUCCESS'
const GET_CONSTRUCTIONS_ERROR = 'GET_CONSTRUCTIONS_ERROR'

const INITIAL_STATE = {
  data: [],
};

const constructionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CONSTRUCTIONS:
      return { ...state }

    case GET_CONSTRUCTIONS_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.payload.data
        ],
      }

    case GET_CONSTRUCTIONS_ERROR:
      return {
        ...state,
        error: action.error
      }

    default:
      return state
  }
};

// const getConstructionsAction = (constructions) => (
//   {
//     type: GET_CONSTRUCTIONS,
//     payload: {
//       constructions
//     },
//     meta: {
//       offline: {
//         effect: { url: `${baseURL}/constructions`, method: 'GET' },
//         commit: { type: GET_CONSTRUCTIONS_SUCCESS },
//         rollback: { type: GET_CONSTRUCTIONS_ERROR }
//       }
//     }
//   }
// )

export const getConstructions = () => async (dispatch) => {
  const jwt = await token.getToken()

  api.get('/constructions', {
    headers: { Authorization: `Bearer ${jwt}` }
  })
    .then(async (resp) => {
      dispatch({ type: GET_CONSTRUCTIONS_SUCCESS, payload: resp.data })
    })
    .catch((error) => {
      dispatch({ type: GET_CONSTRUCTIONS_ERROR, error: error.response.data })
    })
}


export default constructionReducer
