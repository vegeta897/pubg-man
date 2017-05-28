'use strict';
export default(state = [], payload) => {
    switch(payload.type) {
        case 'ADD_PLAYER':
            return [...state, payload.player];
        default:
            return state;
    }
};