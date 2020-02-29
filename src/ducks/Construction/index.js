import { baseURL } from '~/api'

const GET_CONSTRUCTIONS = 'GET_CONSTRUCTIONS'
// const GET_CONSTRUCTIONS_SUCCESS = 'GET_CONSTRUCTIONS_SUCCESS'
// const GET_CONSTRUCTIONS_ERROR = 'GET_CONSTRUCTIONS_ERROR'
const GET_CONSTRUCTIONS_FAKE = 'GET_CONSTRUCTIONS_ERROR'

const INITIAL_STATE = {
  list: [],
};

const constructionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CONSTRUCTIONS:
      return { ...state }

    // case GET_CONSTRUCTIONS_SUCCESS:
    //   return {
    //     ...state,
    //     constructions: [
    //       ...state.constructions,
    //       action.payload.data.name
    //     ],
    //   }

    // case GET_CONSTRUCTIONS_ERROR:
    //   return {
    //     ...state,
    //     error: action.error
    //   }

    case GET_CONSTRUCTIONS_FAKE:
      return {
        ...state,
        list: action.payload
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

// FAKE
const getConstructionsAction = () => (
  {
    type: GET_CONSTRUCTIONS_FAKE,
    payload: [
      { id: 0, name: 'Obra' },
      { id: 1, name: 'Obra' },
      { id: 2, name: 'Obra' },
    ]
  }
)

export const getConstructions = (construction) => (dispatch) => {
  dispatch(getConstructionsAction(construction));
}


export default constructionReducer
