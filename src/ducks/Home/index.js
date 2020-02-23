const INITIAL_STATE = {
  names: [
    'Ricardo',
  ],
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_NAME':
      return {
        ...state,
        names: [
          ...state.names,
          action.payload,
        ],
      }

    default:
      return state
  }
};

export const addName = (name) => (
  {
    type: 'ADD_NAME',
    payload: name,
  }
);

export default homeReducer
