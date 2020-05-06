import { combineReducers } from 'redux';
import userReducer from './User'
import constructionReducer from './Construction'

const rootReducer = combineReducers({
  user: userReducer,
  construction: constructionReducer,
})

export default (state, action) => rootReducer(action.type === 'LOGOUT' ? undefined : state, action);
