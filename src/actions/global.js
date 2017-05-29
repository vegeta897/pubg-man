export const startTick = (intervalID) => {
    return {
        type: 'TICK_START',
        intervalID
    }
};

export const tick = () => {
    return {
        type: 'TICK'
    }
};

export const stopTick = () => {
    return {
        type: 'TICK_STOP'
    }
};