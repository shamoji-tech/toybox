import { store } from '../../index';
import * as actionTypes from './actions';

export class BoardState {

    constructor(rowNum, colNum, numMine){
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.numMine = numMine;
    }
}


export class Board {
    constructor(boardState){
        this.cells = []
        this.boardState = boardState;
        
        for(var i1=0; i1<boardState.rowNum; i1++){
            const rowData = [];
            for(var i2=0; i2<boardState.colNum; i2++){
                const cell = new Cell(i2, i1);
                rowData.push(cell);
            }
            this.cells.push(rowData);
        }
        
        
    }
}

class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.isMine = false;
        this.hint = 0;
        this.isOpen = false;
        this.neighbourCell = [];
        this.isCellOpen = false;
    }

    openCell(){
        this.isCellOpen = true;
        if(this.isMine){
            store.dispatch(
                ()=>actionTypes.stepOnTheMine()
            );
        }
    }
}
