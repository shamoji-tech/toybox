import * as actionTypes from './actions';
import * as diffTypes from './diffTypes';


class Board {
    constructor(rowNum, colNum){
        this.cells = []
        for(var i=0; i<rowNum; i++){
            const rowData = new Array(colNum).fill(new Cell());
            this.cells.push(rowData);
        }
        this.rowNum = rowNum;
        this.colNum = colNum;

    }
    
    setMine(mineNum){

    }

    setHint(){

    }
}

class Cell {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.isMine = false;
        this.hint = 0;
        this.isOpen = false;
    }
}


const initMineSweeperState = {
    rowNum: 9,
    colNum: 9,
    mineNum: 10,
    diffType: diffTypes.noob,
    board : new Board(0, 0),
    isDisplay: false,
};

const mineSweeperReducer = (state=initMineSweeperState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_DIFF_NOOB:
        case actionTypes.CHANGE_DIFF_NORMAL:
        case actionTypes.CHANGE_DIFF_ADV:
            return {
                ...state,
                rowNum: action.rowNum,
                colNum: action.colNum,
                mineNum: action.mineNum,
                diffType: action.diffType,
                isDisplay: false,
            };
        case actionTypes.START:
            
            return {
                ...state,
                board: new Board(state.rowNum, state.colNum),
                isDisplay: true,
            };
        case actionTypes.RESET:
            return {
                ...state,
                board: new Board(state.rowNum, state.colNum),
                isDisplay: false,
            };
        default:
            return state;
    }
};

export default mineSweeperReducer;