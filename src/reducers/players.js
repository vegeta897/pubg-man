import { Actions } from '../actions';
import { CreatePlayer } from '../gameModel';

export default (state, action) => {
    switch(action.type) {
        case Actions.TICK:
            if(state.getIn(['global','tick']) === 3) {
                return state.updateIn(['players','lfg'], lfg => lfg.push(CreatePlayer()));
            } else return state;
        case Actions.RECRUIT_PLAYER:
            return state.update('players', players => {
                return players.update('lfg', lfg => lfg.filter(player => player !== action.player))
                    .update('roster', roster => roster.push(action.player));
            });
        default:
            return state;
    }
};