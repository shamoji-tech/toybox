import { Box, Button, Divider, Grid, Grow, Menu, MenuItem, Typography } from '@material-ui/core';
import React, { useState , Component } from 'react';
import { connect } from 'react-redux';
import TimerDisplay from '../TimerDisplay/TimerDisplay';
import { pushStart, pushReset, changeDiffNoob, changeDiffNormal, changeDiffAdvanced } from './actions';
import { unixTime2String } from '../Utils/utils';

function Mine(props) {
    
    const [isOpen, setOpenState] = useState(false);
    
    
    const styles = {
        btn: {
            minWidth: "32px",
            width: "32px",
            height: "32px",
            borderRadius: "0px",
        }
    };
    return (
        <Grid item>
            <Button 
                variant="contained" 
                color="primary" 
                style={styles.btn} 
                onClick={() => {setOpenState(true); props.cell.openCell();}}
                disabled={isOpen}
                >
                {isOpen ? 1 : ""}
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
        this.setState((prevState)=>{
            return {
                ...prevState,
                startTime: Date.now(),
            };
        })
    };

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
    }

    render(){
        const { 
            mine, 
            board,
            isDisplay,
            pushChangeDiffNoob,
            pushChangeDiffNormal,
            pushChangeDiffAdvanced, 
            pushStart, 
            pushReset, 
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
                        <Button color="primary" variant="contained" style={{margin: "8px"}} onClick={()=>{pushStart(); this.timerStarter();}}>START</Button>
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
                    <Box m={1}>
                        {board.cells.map((rowGroup, i) => {
                            return (
                            <Grid container key={"row" + i} wrap="nowrap">
                                {rowGroup.map((colCell, j) => {
                                    return (
                                    <Mine key={"row" + i + "col" + j} cell={colCell}/>
                                );})}
                            </Grid>
                        );})}
                    </Box>
                </Grow>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        mine: state.mine,
        board: state.mine.board,
        isDisplay: state.mine.isDisplay,
    }),
    (dispatch) => ({
        pushChangeDiffNoob: ()=> dispatch(changeDiffNoob()),
        pushChangeDiffNormal: ()=> dispatch(changeDiffNormal()),
        pushChangeDiffAdvanced: ()=> dispatch(changeDiffAdvanced()),
        pushStart: () => dispatch(pushStart()),
        pushReset: () => dispatch(pushReset()),
    })
)
(MineSweeper);