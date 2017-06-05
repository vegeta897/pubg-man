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

export const CreatePlayer = () => {
    let username = pickInArray(Usernames);
    removeFromArray(username, Usernames);
    return {
        username
    }
};