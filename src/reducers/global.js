import { Actions } from '../actions';

export default (state, action) => {
    switch(action.type) {
        case Actions.START_TICK:
            return state.updateIn(['global','tick'], tick => tick || 0);
        case Actions.TICK:
            return state.updateIn(['global','tick'], tick => tick + 1);
        case Actions.STOP_TICK:
            return state;
        default:
            return state;
    }
};