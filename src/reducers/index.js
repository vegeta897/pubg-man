import { combineReducers } from 'redux';
import * as global from './global';
import * as players from './players';
import GameModel from './../gameModel';
const rootReducer = (state = GameModel, action) => {
    return combineReducers({...global, ...players})(state, action);
};

export default rootReducer;