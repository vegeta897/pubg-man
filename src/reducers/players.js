import { pickInArray, removeFromArray } from '../util';
import immutable from 'immutable';
import seedrandom from 'seedrandom';
import { Actions } from '../actions';
import { Usernames } from '../config/data';

export default (state, action) => {
    switch(action.type) {
        case Actions.CREATE_PLAYER:
            seedrandom(state.getIn(['global','seed']) + state.getIn(['global','tick']), { global: true });
            let newPlayers = [];
            for(let i = 0; i < (action.count || 1); i++) {
                let username = pickInArray(Usernames); // TODO: Check if empty
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
        case Actions.RECRUIT_PLAYER:
            return state.update('lfg', lfg => lfg.remove(action.username))
                .update('roster', roster => roster.add(action.username));
        case Actions.CREATE_TEAM:
            return state.setIn(['teams', action.teamName], action.usernames)
                .update('roster', roster => roster.subtract(action.usernames))
                .update('waiting', deployed => deployed.add(action.teamName));
        case Actions.DEPLOY_TEAM:
            let deploy = {
                startTick: state.getIn(['global','tick'])
            };
            return state.update('waiting', deployed => deployed.remove(action.teamName))
                .update('deployed', deployed => deployed.set(action.teamName, deploy));
        default:
            return state;
    }
};