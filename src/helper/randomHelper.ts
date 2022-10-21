const RiggedDie = require('gamblers-dice')

export const getNewDieInstance = (max: number = 10) => {
    return new RiggedDie(max);
}

export const riggedRoll = <T>(riggedDie: any, possibleOptions: Array<T>) => {
    var rollResult = riggedDie.roll();
    return possibleOptions[rollResult - 1];
}