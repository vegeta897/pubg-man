'use strict';
export const addToRoster = (player) => {
    console.log('adding player:', player);
    return {
        type: 'ADD_PLAYER',
        player
    }
};