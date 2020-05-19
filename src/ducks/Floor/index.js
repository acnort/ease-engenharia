import api from '~/api'
import * as token from '~/utils/token'

const GET_FLOORS = 'GET_FLOORS'
const GET_FLOORS_SUCCESS = 'GET_FLOORS_SUCCESS'
const GET_FLOORS_ERROR = 'GET_FLOORS_ERROR'
const CREATE_FLOOR = 'CREATE_FLOOR'
const CREATE_FLOOR_SUCCESS = 'CREATE_FLOOR_SUCCESS'
const CREATE_FLOOR_ERROR = 'CREATE_FLOOR_ERROR'
// const EDIT_FLOOR = 'EDIT_FLOOR'
// const EDIT_FLOOR_SUCCESS = 'EDIT_FLOOR_SUCCESS'
// const EDIT_FLOOR_ERROR = 'EDIT_FLOOR_ERROR'

const INITIAL_STATE = {
  data: [],
};

const floorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FLOORS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: undefined
      }

    case GET_FLOORS_ERROR:
      return {
        ...state,
        data: [],
        error: action.error
      }

    default:
      return state
  }
};

export const getFloors = (id) => async (dispatch) => {
  const jwt = await token.getToken()
  dispatch({ type: GET_FLOORS, payload: {} })

  api.get(`/constructions/${id}/floors`, {
    headers: { Authorization: `Bearer ${jwt}` }
  })
    .then(async (resp) => {
      dispatch({ type: GET_FLOORS_SUCCESS, payload: resp.data.floors })
    })
    .catch((error) => {
      dispatch({ type: GET_FLOORS_ERROR, error: error.message })
    })
}

export const createFloor = (id, values) => async (dispatch) => {
  const jwt = await token.getToken()
  dispatch({ type: CREATE_FLOOR, payload: {} })

  api.post(`/constructions/${id}/floors`, values, {
    headers: { Authorization: `Bearer ${jwt}` }
  })
    .then(async (resp) => {
      dispatch({ type: CREATE_FLOOR_SUCCESS, payload: resp.data })
    })
    .catch((error) => {
      dispatch({ type: CREATE_FLOOR_ERROR, error: error.response.data })
    })
}


export default floorReducer
