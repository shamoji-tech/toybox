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
    isWin: false,
    isWinModalOpen: false,
    isTimeStop: false,
    goalCount: 0,
    goal:999,
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
                isWinModalOpen : false,
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
            const x = action.cell.x;
            const y = action.cell.y;
            const board = state.board
            board.cells[y][x].isCellOpen = true;
            if(state.goalCount+1 === state.goal){
                
                return {
                    ...state,
                    isWin: true,
                    isWinModalOpen: true,
                    isTimeStop: true,
                    goalCount: state.goalCount+1,
                }

            }else if(action.cell.hint === 0 && !action.cell.isMine){
                action.cell.neighbourCell.forEach((cellMap, index)=>{
                    const cell = state.board.cells[cellMap.y][cellMap.x];
                    if(cell.isCellOpen){
                        return state;
                    }
                    state = mineSweeperReducer(state, {type: actionTypes.OPEN, cell: cell})
                });
            }
            
            return {
                ...state,
                board: board,
                goalCount: state.goalCount+1,
            }
        case actionTypes.OPEN_WITH_FLAG:
            let flagNum = 0;
            action.cell.neighbourCell.forEach((cellMap, index)=>{
                const cell = state.board.cells[cellMap.y][cellMap.x];
                if(cell.isFlag){flagNum ++;}
            });
            if(flagNum === action.cell.hint){
                action.cell.neighbourCell.forEach((cellMap, index)=>{
                    const cell = state.board.cells[cellMap.y][cellMap.x];
                    console.log(cell)
                    if(!cell.isCellOpen && !cell.isFlag){
                        state = mineSweeperReducer(state, {type: actionTypes.OPEN, cell: cell,})
                    }
                });
            }
            return state;
        
        case actionTypes.CHANGE_DIFF_DEBUG:
        case actionTypes.CHANGE_DIFF_NOOB:
        case actionTypes.CHANGE_DIFF_NORMAL:
        case actionTypes.CHANGE_DIFF_ADV:
            return {
                ...state,
                boardState: action.boardState,
                diffType: action.diffType,
                isDisplay: false,
                isGameOver: false,
                isWin: false,
            };
        case actionTypes.START:
            
            return {
                ...state,
                board: action.board,
                isDisplay: true,
                goalCount: 0,
                goal: state.boardState.goal
            };
        case actionTypes.RESET:
            return {
                ...state,
                isDisplay: false,
                isGameOver: false,
                isWin: false,
                goalCount: 0,
                goal: 999,
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