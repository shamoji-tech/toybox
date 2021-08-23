import * as diffTypes from './diffTypes';

export const START = "@@MineSweeper/Start";
export const RESET = "@@MineSweeper/Reset";
export const CHANGE_DIFF_NOOB = "@@MineSweeper/change_diff/noob";
export const CHANGE_DIFF_NORMAL = "@@MineSweeper/change_diff/normal";
export const CHANGE_DIFF_ADV = "@@MineSweeper/change_diff/advanced";


export const pushStart = () => ({
    type: START,
});

export const pushReset = () => ({
    type: RESET,
});

export const changeDiffNoob = () => ({
    type: CHANGE_DIFF_NOOB,
    rowNum: 9,
    colNum: 9,
    mineNum: 10,
    diffType: diffTypes.noob,
});

export const changeDiffNormal = () => ({
    type: CHANGE_DIFF_NORMAL,
    rowNum: 16,
    colNum: 16,
    mineNum: 40,
    diffType: diffTypes.normal,
});

export const changeDiffAdvanced = () => ({
    type: CHANGE_DIFF_ADV,
    rowNum: 16,
    colNum: 30,
    mineNum: 99,
    diffType: diffTypes.advanced,
});

