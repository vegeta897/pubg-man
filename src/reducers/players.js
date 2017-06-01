import { Actions } from '../actions';
import { CreatePlayer } from '../gameModel';

export default (state, action) => {
    switch(action.type) {
        case Actions.TICK:
            if(state.getIn(['global','tick']) === 3) {
                let newPlayer = CreatePlayer();
                return state.setIn(['players', 'byId', newPlayer.username], newPlayer)
                    .updateIn(['players','allIds'], allIds => allIds.add(newPlayer.username))
                    .update('lfg', lfg => lfg.add(newPlayer.username));
            } else return state;
        case Actions.RECRUIT_PLAYER:
            return state.update('lfg', lfg => lfg.remove(action.username))
                .update('roster', roster => roster.add(action.username));
        default:
            return state;
    }
};