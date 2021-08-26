
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

        //隣接cell情報の参照を渡す。
        this.setNeighborCell();
        
        let nowNumMine = 0;
        while(nowNumMine <= this.boardState.numMine){
            const selectedRow = Math.floor( Math.random() * this.boardState.rowNum );
            const selectedCol = Math.floor( Math.random() * this.boardState.colNum );

            this.cells[selectedRow][selectedCol].isMine = true;
            this.cells[selectedRow][selectedCol].neighbourCell.forEach((cellMap,index) => {
                this.cells[cellMap.y][cellMap.x].hint++;
            });
            nowNumMine ++;
        }


    }

    setNeighborCell(){

        //左上
        const rowNum = this.boardState.rowNum;
        const colNum = this.boardState.colNum;

        this.cells[0][0].neighbourCell.push({y:0,x:1});
        this.cells[0][0].neighbourCell.push({y:1,x:0});

        //上辺
        for(var i=1; i<colNum-1; i++){
            this.cells[0][i].neighbourCell.push({y:0,x: i-1});
            this.cells[0][i].neighbourCell.push({y:1,x: i});
            this.cells[0][i].neighbourCell.push({y:0,x: i+1});
        }

        //右上
        this.cells[0][colNum-1].neighbourCell.push({y:0,x:colNum-2});
        this.cells[0][colNum-1].neighbourCell.push({y:1,x:colNum-1});
        
        for(var i1=1; i1<rowNum-1; i1++){
            //左辺
            this.cells[i1][0].neighbourCell.push({y:i1-1,x:0});
            this.cells[i1][0].neighbourCell.push({y:i1  ,x:1});
            this.cells[i1][0].neighbourCell.push({y:i1+1,x:0});

            for(var i2=1; i2<colNum -1; i2++){
                this.cells[i1][i2].neighbourCell.push({y:i1-1,x:i2  });
                this.cells[i1][i2].neighbourCell.push({y:i1  ,x:i2-1});
                this.cells[i1][i2].neighbourCell.push({y:i1  ,x:i2+1});
                this.cells[i1][i2].neighbourCell.push({y:i1+1,x:i2  });
            }
            //右辺
            this.cells[i1][colNum-1].neighbourCell.push({y:i1-1,x:colNum-1});
            this.cells[i1][colNum-1].neighbourCell.push({y:i1  ,x:colNum-2});
            this.cells[i1][colNum-1].neighbourCell.push({y:i1+1,x:colNum-1});
        }

        //左下
        this.cells[rowNum-1][0].neighbourCell.push({y:rowNum-2,x:0});
        this.cells[rowNum-1][0].neighbourCell.push({y:rowNum-1,x:1});
        
        //下辺
        for(var j=1; j<colNum-1; j++){
            this.cells[rowNum-1][j].neighbourCell.push({y:rowNum-2, x:j  });
            this.cells[rowNum-1][j].neighbourCell.push({y:rowNum-1, x:j-1});
            this.cells[rowNum-1][j].neighbourCell.push({y:rowNum-1, x:j+1});
        }

        //右下
        this.cells[rowNum-1][colNum-1].neighbourCell.push({y:rowNum-2,x:colNum-1});
        this.cells[rowNum-1][colNum-1].neighbourCell.push({y:rowNum-1,x:colNum-2});

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
    }
}
