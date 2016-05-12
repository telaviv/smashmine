import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import compare from './compare';


const rootReducer = combineReducers({
  counter,
  compare,
  routing,
  form,
});


export default rootReducer;
