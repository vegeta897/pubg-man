import { Actions } from '../actions';
import { CreatePlayer } from '../gameModel';

export default (state, action) => {
    switch(action.type) {
        case Actions.TICK:
            if(state.getIn(['global','tick']) === 3) {
                return CreatePlayer(state);
            } else return state;
        case Actions.RECRUIT_PLAYER:
            return state.update('lfg', lfg => lfg.remove(action.username))
                .update('roster', roster => roster.add(action.username));
        default:
            return state;
    }
};