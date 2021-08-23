import * as diffTypes from './diffTypes';
import { BoardState } from './elements';

export const START = "@@MineSweeper/Start";
export const RESET = "@@MineSweeper/Reset";
export const GAMEOVER = "@@MineSweeper/GameOver";
export const CHANGE_DIFF_NOOB = "@@MineSweeper/change_diff/noob";
export const CHANGE_DIFF_NORMAL = "@@MineSweeper/change_diff/normal";
export const CHANGE_DIFF_ADV = "@@MineSweeper/change_diff/advanced";


export const pushStart = () => ({
    type: START,
});

export const pushReset = () => ({
    type: RESET,
});

export const stepOnTheMine = () => ({
    type: GAMEOVER,
});

export const changeDiffNoob = () => ({
    type: CHANGE_DIFF_NOOB,
    boardState: new BoardState(9, 9, 10),
    diffType: diffTypes.noob,
});

export const changeDiffNormal = () => ({
    type: CHANGE_DIFF_NORMAL,
    boardState: new BoardState(16, 16, 40),
    diffType: diffTypes.normal,
});

export const changeDiffAdvanced = () => ({
    type: CHANGE_DIFF_ADV,
    boardState: new BoardState(16, 30, 99),
    diffType: diffTypes.advanced,
});

