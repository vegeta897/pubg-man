export const random = (min, max) => {
    if(isNaN(max)) {
        max = min < 0 ? 0 : min;
        min = min < 0 ? min : 0;
    }
    return Math.floor(Math.random() * (+max - +min + 1)) + +min;
};

export const pickInArray = arr => arr[random(arr.length-1)];

export const removeFromArray = (elem, arr, full) => {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === elem) {
            arr.splice(i, 1);
            if(!full) return;
            i--;
        }
    }
};

export const capitalize = string => {
    return string[0].toUpperCase() + string.slice(1 - string.length)
};