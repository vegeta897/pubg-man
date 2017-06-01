import { Actions } from '../actions';

export default (state, action) => {
    switch(action.type) {
        case Actions.START_TICK:
            return state.setIn(['global','intervalID'], action.intervalID)
                .updateIn(['global','tick'], tick => tick || 0);
        case Actions.TICK:
            return state.updateIn(['global','tick'], tick => tick + 1);
        case Actions.STOP_TICK:
            return state.setIn(['global','intervalID'], null);
        default:
            return state;
    }
};