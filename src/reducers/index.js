import reduceReducers from 'reduce-reducers';
import global from './global';
import players from './players';
import { InitialState } from './../gameModel';
const rootReducer = (state = InitialState, action) => {
    return reduceReducers(global, players)(state, action);
};

export default rootReducer;