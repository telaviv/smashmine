import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import compare from './compare';


const rootReducer = combineReducers({
  compare,
  routing,
  form,
});


export default rootReducer;
