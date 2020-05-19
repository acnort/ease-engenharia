import api from '~/api'
import * as token from '~/utils/token'

const GET_CONSTRUCTIONS = 'GET_CONSTRUCTIONS'
const GET_CONSTRUCTIONS_SUCCESS = 'GET_CONSTRUCTIONS_SUCCESS'
const GET_CONSTRUCTIONS_ERROR = 'GET_CONSTRUCTIONS_ERROR'
const CREATE_CONSTRUCTION = 'CREATE_CONSTRUCTION'
const CREATE_CONSTRUCTION_SUCCESS = 'CREATE_CONSTRUCTION_SUCCESS'
const CREATE_CONSTRUCTION_ERROR = 'CREATE_CONSTRUCTION_ERROR'
const EDIT_CONSTRUCTION = 'EDIT_CONSTRUCTION'
const EDIT_CONSTRUCTION_SUCCESS = 'EDIT_CONSTRUCTION_SUCCESS'
const EDIT_CONSTRUCTION_ERROR = 'EDIT_CONSTRUCTION_ERROR'

const INITIAL_STATE = {
  data: [],
};

const constructionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CONSTRUCTIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: undefined
      }

    case GET_CONSTRUCTIONS_ERROR:
      return {
        ...state,
        data: [],
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
  dispatch({ type: GET_CONSTRUCTIONS, payload: {} })

  api.get('/constructions', {
    headers: { Authorization: `Bearer ${jwt}` }
  })
    .then(async (resp) => {
      dispatch({ type: GET_CONSTRUCTIONS_SUCCESS, payload: resp.data.constructions })
    })
    .catch((error) => {
      dispatch({ type: GET_CONSTRUCTIONS_ERROR, error: error.message })
    })
}

export const createConstruction = (values) => async (dispatch) => {
  const jwt = await token.getToken()
  dispatch({ type: CREATE_CONSTRUCTION, payload: {} })

  api.post('/constructions', values, {
    headers: { Authorization: `Bearer ${jwt}` }
  })
    .then(async (resp) => {
      dispatch({ type: CREATE_CONSTRUCTION_SUCCESS, payload: resp.data })
    })
    .catch((error) => {
      dispatch({ type: CREATE_CONSTRUCTION_ERROR, error: error.response.data })
    })
}

export const editConstruction = (values) => async (dispatch) => {
  const jwt = await token.getToken()
  const { id, ...rest } = values
  dispatch({ type: EDIT_CONSTRUCTION, payload: {} })

  api.put(`/constructions/${id}`, rest, {
    headers: { Authorization: `Bearer ${jwt}` }
  })
    .then(async (resp) => {
      dispatch({ type: EDIT_CONSTRUCTION_SUCCESS, payload: resp.data })
    })
    .catch((error) => {
      dispatch({ type: EDIT_CONSTRUCTION_ERROR, error: error.response.data })
    })
}


export default constructionReducer
