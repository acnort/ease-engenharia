import { combineReducers } from 'redux';
import userReducer from './User'
import constructionReducer from './Construction'

export default combineReducers({
  user: userReducer,
  construction: constructionReducer,
})
