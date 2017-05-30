export const global = (state = {}, action) => {
    switch(action.type) {
        case 'TICK_START':
            return { ...state, intervalID: action.intervalID, tick: state.tick || 0 };
        case 'TICK':
            return { ...state, tick: state.tick + 1 };
        case 'TICK_STOP':
            return { ...state, intervalID: null };
        default:
            return state;
    }
};