export const addToRoster = (username) => {
    return {
        type: 'RECRUIT_PLAYER',
        username
    }
};