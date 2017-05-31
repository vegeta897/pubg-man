export const players = (state = {}, action) => {
    switch(action.type) {
        case 'RECRUIT_PLAYER':
            return {
                roster: [...state.roster, action.player]
            };
        default:
            return state;
    }
};