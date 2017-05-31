// Reference: https://github.com/GGulati/EternalSunshine

// Seeded RNG
import seedrandom from 'seedrandom';
let seed = new Date().getTime();
seedrandom(seed, { global: true });

export default {
    global: { seed },
    players: {
        roster: []
    }
}