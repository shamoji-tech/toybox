import * as actionTypes from './actions';
import * as diffTypes from './diffTypes';
import { Board, BoardState } from './elements';

const initMineSweeperState = {
    boardState: new BoardState(9, 9, 10),
    diffType: diffTypes.noob,
    board : new Board(new BoardState(9, 9, 10)),
    isDisplay: false,
};

const mineSweeperReducer = (state=initMineSweeperState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_DIFF_NOOB:
        case actionTypes.CHANGE_DIFF_NORMAL:
        case actionTypes.CHANGE_DIFF_ADV:
            return {
                ...state,
                boardState: action.boardState,
                diffType: action.diffType,
                isDisplay: false,
            };
        case actionTypes.START:
            
            return {
                ...state,
                board: new Board(state.boardState),
                isDisplay: true,
            };
        case actionTypes.RESET:
            return {
                ...state,
                board: new Board(state.boardState),
                isDisplay: false,
            };
        default:
            return state;
    }
};

export default mineSweeperReducer;