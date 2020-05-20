import api from '~/api'
import * as token from '~/utils/token'

const GET_ITEMS = 'GET_ITEMS'
const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR'
const CREATE_ITEM = 'CREATE_ITEM'
const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS'
const CREATE_ITEM_ERROR = 'CREATE_ITEM_ERROR'
// const EDIT_ITEM = 'EDIT_ITEM'
// const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS'
// const EDIT_ITEM_ERROR = 'EDIT_ITEM_ERROR'

const INITIAL_STATE = {
  data: [],
};

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: undefined
      }

    case GET_ITEMS_ERROR:
      return {
        ...state,
        data: [],
        error: action.error
      }

    default:
      return state
  }
};

export const getItems = (constructionId, floorId) => async (dispatch) => {
  const jwt = await token.getToken()
  dispatch({ type: GET_ITEMS, payload: {} })

  api.get(`/constructions/${constructionId}/floors/${floorId}`, {
    headers: { Authorization: `Bearer ${jwt}` }
  })
    .then(async (resp) => {
      dispatch({ type: GET_ITEMS_SUCCESS, payload: resp.data.floors })
    })
    .catch((error) => {
      dispatch({ type: GET_ITEMS_ERROR, error: error.message })
    })
}

export const createItem = (constructionId, floorId, values) => async (dispatch) => {
  const jwt = await token.getToken()
  dispatch({ type: CREATE_ITEM, payload: {} })

  api.post(`/constructions/${constructionId}/floors/${floorId}`, values, {
    headers: { Authorization: `Bearer ${jwt}` }
  })
    .then(async (resp) => {
      dispatch({ type: CREATE_ITEM_SUCCESS, payload: resp.data })
    })
    .catch((error) => {
      dispatch({ type: CREATE_ITEM_ERROR, error: error.response.data })
    })
}


export default itemReducer
