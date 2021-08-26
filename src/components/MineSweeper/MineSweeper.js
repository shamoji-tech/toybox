import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Grow, Menu, MenuItem, Paper, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimerDisplay from '../TimerDisplay/TimerDisplay';
import { pushStart, pushReset, changeDiffNoob, changeDiffNormal, changeDiffAdvanced, cellOpen, cellFlag, stepOnTheMine, closeModal, timeStopCloser, changeDiffDebug, openWithFlag } from './actions';
import { unixTime2String } from '../Utils/utils';
import useLongPress from '../Utils/LongPress';
import FlagIcon from '@material-ui/icons/Flag';
import { Board } from './elements';
import { SET_FLAG, REMOVE_FLAG} from './actions';
import Brightness7Icon from '@material-ui/icons/Brightness7';

function ButtonIcon(props) {
    if(props.cell.isFlag){
        return (
            <>
                <FlagIcon />
            </>
        );
    }else if(props.cell.isCellOpen){
        if(props.cell.isMine){
            return (
                <Brightness7Icon />
            );
        }else{
            return (
                <Typography>
                    {props.cell.hint? props.cell.hint: ""}
                </Typography>
            );
        }
    }else{
        return (
            <Typography>
                {""}
            </Typography>
        );
    }
}

function Mine(props) {
    
    const styles = {
        btn: {
            minWidth: "32px",
            width: "32px",
            height: "32px",
            borderRadius: "0px",
        }
    };
    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 300,
      };

    const onClick = () => {
        if(props.cell.isFlag){return;}
        else if(props.cell.isCellOpen){
            props.openWithFlagDispatcher(props.cell);
        }
        else if(props.cell.isMine){
            props.openDispatcher(props.cell);
            props.gameoverDispatcher();
        }
        else
        {
            props.openDispatcher(props.cell);
        }
    }

    const onLongPress = () => {
        if(props.cell.isFlag){
            props.flagDispatcher(props.cell, REMOVE_FLAG);
        }else if(props.cell.isCellOpen){
            
        }else{
            props.flagDispatcher(props.cell, SET_FLAG);
        }
    }
    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
      
    return (
        <Grid item>
            <Button 
                variant={props.cell.isCellOpen? "outlined" : "contained"}
                color="primary"
                style={styles.btn} 
                component={props.cell.isFlag? Paper: "button"}
                {...longPressEvent}
                >
                <ButtonIcon cell={props.cell}/>
            </Button>
        </Grid>
    );
}

function SelectDiffMenu(props) {


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <div>
            <Button color="primary" variant="contained" aria-controls={props.name} aria-haspopup="true" onClick={handleClick} style={{margin: "8px", width:"150px"}}>
                {props.text}
            </Button>
            <Menu
                id={props.name}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {props.menuList.map((item, index)=>{
                    return (
                        <MenuItem 
                            onClick={()=>{handleClose(); item.func(); props.timerReseter();}} 
                            key={"dif_menu:" + index}

                        >
                            <Typography >{item.name}</Typography>
                            <Typography variant="caption" style={{color: "#9c9c9c"}}>{item.detail}</Typography>
                        </MenuItem>
                        );
                    })
                }

            </Menu>
        </div>
    );

}

class MineSweeper extends Component {

    state = {startTime: 0,};

    timerStarter = ()=>{
        this.timerRef.current.timerStarter();
        if(!this.state.startTime){
            this.setState((prevState)=>{
                return {
                    ...prevState,
                    startTime: Date.now(),
                };
            });
        }
    };

    timerStopper = () => {
        this.timerRef.current.timerStopper();
        
    }

    timerReseter = ()=>{
        this.timerRef.current.timerReseter();
        this.setState((prevState)=>{
            return {
                ...prevState,
                startTime: 0,
            };
        })
    };

    constructor(props){
        super(props);
        this.timerRef = React.createRef();
        this.timerStarter = this.timerStarter.bind(this);
        this.timerReseter = this.timerReseter.bind(this);
        this.timerStopper = this.timerStopper.bind(this);
    }
    componentDidUpdate(){
        if(this.props.isTimeStop){
            this.timerStopper();
            this.props.timeStopCloser();
        }
    }
    render(){
        const { 
            mine, 
            board,
            isDisplay,
            isGameOver,
            isGameOverModalOpen,
            isWin,
            isWinModalOpen,
            pushChangeDiffNoob,
            pushChangeDiffNormal,
            pushChangeDiffAdvanced, 
            pushStart, 
            pushReset, 
            cellOpen,
            cellFlag,
            stepOnTheMine,
            closeModal,
            openWithFlag,
        } = this.props
        return (
            <div>
                <Grid container style={{width: "300px", margin: "8px"}}>
                    <Grid item>
                        <Typography variant="h4">MineSweeper</Typography>
                    </Grid>
                </Grid>
                <Grid container style={{width: "300px", margin: "8px"}}>
                    <Grid item>
                        <Typography variant="body1" style={{color: "#9c9c9c"}}>マインスイーパー</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container>
                    <Grid item>
                        <SelectDiffMenu 
                            name={"select-diff"} 
                            text={"難易度を選択"}
                            menuList={[
                                {
                                    name: "初心者",
                                    detail: "9x9",
                                    func: pushChangeDiffNoob,
                                },
                                {
                                    name: "中級者",
                                    detail: "16x16",
                                    func: pushChangeDiffNormal,
                                },
                                {
                                    name: "上級者",
                                    detail: "30x16",
                                    func: pushChangeDiffAdvanced,
                                },
                            ]}
                            timerReseter={this.timerReseter}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Typography style={{color: "#9c9c9c"}}>選択難易度:{mine.boardState.colNum}x{mine.boardState.rowNum} 地雷:{mine.boardState.numMine}設定</Typography>
                </Grid>
                <Divider />
                <Grid container>
                    <Grid item>
                        <Button color="primary" variant="contained" style={{margin: "8px"}} onClick={()=>{pushStart(mine); this.timerStarter();}}>START</Button>
                    </Grid>
                    <Grid item>
                        <Button color="secondary" variant="contained" style={{margin: "8px"}} onClick={()=>{pushReset(); this.timerReseter();}}>RESET</Button>
                    </Grid>
                    <Grid item>
                        <TimerDisplay ref={this.timerRef} isDisplay={isDisplay} startTime={this.state.startTime} displayFunction={unixTime2String} displayDefault="00:00:00:000."/>
                    </Grid>
                </Grid>
                <Divider />
                <Grow in={isDisplay}>
                    <Box m={1} style={isGameOver || isWin ? {pointerEvents:"none"} : {}}>
                        {board.cells.map((rowGroup, i) => {
                            return (
                            <Grid container key={"row" + i} wrap="nowrap">
                                {rowGroup.map((colCell, j) => {
                                    return (
                                    <Mine key={"row" + i + "col" + j + Date.now()} cell={colCell} openDispatcher={cellOpen} flagDispatcher={cellFlag} gameoverDispatcher={stepOnTheMine} openWithFlagDispatcher={openWithFlag}/>
                                );})}
                            </Grid>
                        );})}
                    </Box>
                </Grow>
                <Dialog 
                    open={isGameOverModalOpen}
                    onClose={closeModal}
                    aria-labelledby="title"
                    aria-describedby="description"
                >
                    <DialogTitle id="title">地雷を踏んでしまった！</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="discription">あなたは地雷を踏んでしまいました！</DialogContentText>
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={closeModal} color="primary">確認する</Button>
                    </DialogActions>
                </Dialog>
                <Dialog 
                    open={isWinModalOpen}
                    onClose={closeModal}
                    aria-labelledby="win-title"
                    aria-describedby="win-description"
                >
                    <DialogTitle id="win-title">地雷除去成功！</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="win-discription">やったね！</DialogContentText>
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={closeModal} color="primary">確認する</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        mine: state.mine,
        board: state.mine.board,
        isDisplay: state.mine.isDisplay,
        isGameOver: state.mine.isGameOver,
        isTimeStop: state.mine.isTimeStop,
        isGameOverModalOpen: state.mine.isGameOverModalOpen,
        isWin: state.mine.isWin,
        isWinModalOpen: state.mine.isWinModalOpen,
        goalCount : state.mine.goalCount,
        goal: state.mine.goal,
    }),
    (dispatch) => {
        return (
            {
                pushChangeDiffDebug: () => dispatch(changeDiffDebug()),
                pushChangeDiffNoob: ()=> dispatch(changeDiffNoob()),
                pushChangeDiffNormal: ()=> dispatch(changeDiffNormal()),
                pushChangeDiffAdvanced: ()=> dispatch(changeDiffAdvanced()),
                pushStart: (mine) => dispatch(pushStart(new Board(mine.boardState))),
                pushReset: () => dispatch(pushReset()),
                cellOpen: (cell) => dispatch(cellOpen(cell)),
                cellFlag: (cell, status) => dispatch(cellFlag(cell, status)),
                stepOnTheMine: ()=> dispatch(stepOnTheMine()),
                closeModal: ()=> dispatch(closeModal()),
                timeStopCloser: () => dispatch(timeStopCloser()),
                openWithFlag: (cell) => dispatch(openWithFlag(cell)),
            }
        );
    }
)
(MineSweeper);