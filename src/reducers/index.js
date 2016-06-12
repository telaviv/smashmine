import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import compare from './compare';
import player from './player';

const rootReducer = combineReducers({
  compare,
  player,
  routing,
  form,
});


export default rootReducer;
