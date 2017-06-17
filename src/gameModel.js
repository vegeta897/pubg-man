// Reference: https://github.com/GGulati/EternalSunshine
import { createPlayer } from './actions';
import { TeamAdjectives, TeamNouns } from './config/data';
import { pickInArray, capitalize } from './util';
import immutable from 'immutable';

export const InitialState = immutable.fromJS({
    global: { seed: new Date().getTime() },
    lfg: immutable.Set(),
    roster: immutable.Set(),
    teams: immutable.Map(),
    players: {
        byId: {},
        allIds: immutable.Set()
    }
});

export const GenerateTeamName = teams => {
    let teamName;
    do {
        teamName = capitalize(pickInArray(TeamAdjectives)) + ' ' + capitalize(pickInArray(TeamNouns))
    } while (teams.get(teamName));
    return teamName;
};

export const Schedule = [];
Schedule[1] = createPlayer;
Schedule[3] = createPlayer;
Schedule[2] = createPlayer;
Schedule[4] = createPlayer;
Schedule[5] = createPlayer;