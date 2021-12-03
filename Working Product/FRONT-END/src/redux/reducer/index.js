import {combineReducers} from 'redux';
import {
  forgotReducer,
} from './auth';
import {globalReducer} from './global';

const reducer = combineReducers({
  globalReducer,
  forgotReducer,
});

export default reducer;
