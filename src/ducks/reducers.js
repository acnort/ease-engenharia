import { combineReducers } from 'redux';
import userReducer from './User'
import constructionReducer from './Construction'
import floorReducer from './Floor'

const rootReducer = combineReducers({
  user: userReducer,
  construction: constructionReducer,
  floor: floorReducer,
})

export default (state, action) => rootReducer(action.type === 'LOGOUT' ? undefined : state, action);
