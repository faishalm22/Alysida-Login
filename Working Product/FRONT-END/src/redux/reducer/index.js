import {combineReducers} from 'redux';
import {
  registerReducer,
  photoReducer,
  forgotReducer,
  signUpReducer,
} from './auth';
import {globalReducer} from './global';
import {safetyReducer} from './safety';

const reducer = combineReducers({
  registerReducer,
  globalReducer,
  photoReducer,
  forgotReducer,
  signUpReducer,
  safetyReducer,
});

export default reducer;
