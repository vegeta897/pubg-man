export const Actions = {
    START_TICK: 'GLOBAL_TICK_START',
    TICK: 'GLOBAL_TICK',
    STOP_TICK: 'GLOBAL_TICK_STOP',
    RECRUIT_PLAYER: 'PLAYERS_RECRUIT'
};

export const startTick = intervalID => ({ type: Actions.START_TICK, intervalID });
export const tick = () => ({ type: Actions.TICK });
export const stopTick = () => ({ type: Actions.STOP_TICK });
export const addToRoster = username => ({ type: Actions.RECRUIT_PLAYER, username });