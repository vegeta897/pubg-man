import { combineReducers } from 'redux';
import * as global from './global';
import * as roster from './roster';
const rootReducer = combineReducers({...global, ...roster});
export default rootReducer;