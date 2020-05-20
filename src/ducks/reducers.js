import { combineReducers } from 'redux';
import userReducer from './User'
import constructionReducer from './Construction'
import floorReducer from './Floor'
import itemReducer from './Item'

const rootReducer = combineReducers({
  user: userReducer,
  construction: constructionReducer,
  floor: floorReducer,
  item: itemReducer,
})

export default (state, action) => rootReducer(action.type === 'LOGOUT' ? undefined : state, action);
