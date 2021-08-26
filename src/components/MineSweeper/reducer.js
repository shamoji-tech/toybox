import * as actionTypes from './actions';
import * as diffTypes from './diffTypes';
import { Board, BoardState } from './elements';

const initMineSweeperState = {
    boardState: new BoardState(9, 9, 10),
    diffType: diffTypes.noob,
    board : new Board(new BoardState(9, 9, 10)),
    isDisplay: false,
    isGameOver: false,
    isGameOverModalOpen: false,
    isTimeStop: false,
};

const mineSweeperReducer = (state=initMineSweeperState, action) => {
    
    switch(action.type){
        case actionTypes.GAMEOVER:
            return {
                ...state,
                isGameOver: true,
                isGameOverModalOpen: true,
                isTimeStop: true,
            };
        case actionTypes.CLOSE_MODAL:
            return {
                ...state,
                isGameOverModalOpen: false,
            };
        case actionTypes.FLAG:
            if(action.status === actionTypes.SET_FLAG){
                action.cell.isFlag = true;
                return state;
            }else if(action.status === actionTypes.REMOVE_FLAG){
                action.cell.isFlag = false;
                return state;
            }
            return state;
        case actionTypes.OPEN:
            action.cell.openCell();
            return {
                ...state,
            }
        case actionTypes.CHANGE_DIFF_NOOB:
        case actionTypes.CHANGE_DIFF_NORMAL:
        case actionTypes.CHANGE_DIFF_ADV:
            return {
                ...state,
                boardState: action.boardState,
                diffType: action.diffType,
                isDisplay: false,
                isGameOver: false,
            };
        case actionTypes.START:
            
            return {
                ...state,
                board: action.board,
                isDisplay: true,
            };
        case actionTypes.RESET:
            return {
                ...state,
                isDisplay: false,
                isGameOver: false,
            };
        case actionTypes.TIME_STOP_CLOSER:
            return {
                ...state,
                isTimeStop: false,
            }
        default:
            return state;
    }
};

export default mineSweeperReducer;