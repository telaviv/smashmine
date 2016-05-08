import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';


const rootReducer = combineReducers({
  counter,
  routing,
  form,
});


export default rootReducer;
