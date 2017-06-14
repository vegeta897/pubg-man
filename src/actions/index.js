export const Actions = {
    START_TICK: 'GLOBAL_TICK_START',
    TICK: 'GLOBAL_TICK',
    STOP_TICK: 'GLOBAL_TICK_STOP',
    CREATE_PLAYER: 'PLAYERS_CREATE',
    RECRUIT_PLAYER: 'PLAYERS_RECRUIT',
    CREATE_TEAM: 'PLAYERS_CREATE_TEAM'
};

export const startTick = () => ({ type: Actions.START_TICK });
export const tick = () => ({ type: Actions.TICK });
export const stopTick = () => ({ type: Actions.STOP_TICK });
export const createPlayer = count => ({ type: Actions.CREATE_PLAYER, count });
export const addToRoster = username => ({ type: Actions.RECRUIT_PLAYER, username });
export const createTeam = usernames => ({ type: Actions.CREATE_TEAM, usernames });