// Reference: https://github.com/GGulati/EternalSunshine
import { pickInArray, removeFromArray, } from './util';
import { Usernames } from './config/data';
import seedrandom from 'seedrandom';
import immutable from 'immutable';

// Seed RNG
let seed = new Date().getTime();
seedrandom(seed, { global: true });

export const InitialState = immutable.fromJS({
    global: { seed },
    lfg: immutable.Set(),
    roster: immutable.Set(),
    players: {
        byId: {},
        allIds: immutable.Set()
    }
});

export const CreatePlayer = (state, count = 1) => {
    let newPlayers = [];
    for(let i = 0; i < count; i++) {
        let username = pickInArray(Usernames);
        removeFromArray(username, Usernames);
        newPlayers.push({
            username
        });
    }
    newPlayers = immutable.Set(newPlayers);
    let newPlayerList = newPlayers.map(player => player.username);
    return state.withMutations(state => {
        state.updateIn(['players', 'byId'], byId => byId.merge(immutable.Map(newPlayers.map(
            player => [player.username, player]
        )))).updateIn(['players','allIds'], allIds => allIds.merge(newPlayerList))
            .update('lfg', lfg => lfg.merge(newPlayerList));
    });
};