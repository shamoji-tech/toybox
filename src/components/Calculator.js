import { Button, Grid, Paper, Divider} from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushDiv, pushEqual, pushMinus, pushNumber, pushPlus, pushTimes, pushAC } from '../actions';

function CalcBtn(props){
    const styles = {
        root: {
            backgroundColor: "lightgray",
            margin: "3px",
        },
    }
    return (
        <Button style={styles.root} onClick={props.onClick}>{props.display}</Button>
    );
}

class Calculator extends Component {
    render(){
        const styles = {
            paper: {
                width: "300px",
                height: "75px",
                textAlign: "right",
                margin: "5px",
                padding: "5px",
            },
            beforeFormula: {
                color: "lightgray",
            }
        }
        const {
            displayFormula,
            displayResult,
            resultValue,
            pushNumber,
            pushPlus,
            pushMinus,
            pushTimes,
            pushDiv,
            pushEqual,
            pushAC,
        } = this.props
        return(
            <div>
                <Grid container xs={4} wrap="nowrap">
                    <Grid container justify="center">
                        <Paper style={styles.paper}>
                            <div style={styles.beforeFormula}>
                                {displayResult ? displayFormula : ""}
                            </div>
                            <div>
                                <h2>{displayResult ? resultValue: displayFormula}</h2>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container xs={4} wrap="nowrap">
                    <Grid container justify="center">
                        <CalcBtn display={7} onClick={() => pushNumber(7)}/>
                        <CalcBtn display={4} onClick={() => pushNumber(4)}/>
                        <CalcBtn display={1} onClick={() => pushNumber(1)}/>
                        <CalcBtn display={0} onClick={() => pushNumber(0)}/>
                    </Grid>
                    <Grid container justify="center">
                        <CalcBtn display={8} onClick={() => pushNumber(8)}/>
                        <CalcBtn display={5} onClick={() => pushNumber(5)}/>
                        <CalcBtn display={2} onClick={() => pushNumber(2)}/>
                        <CalcBtn display={"AC"} onClick={pushAC}/>
                    </Grid>
                    <Grid container justify="center">
                        <CalcBtn display={9} onClick={() => pushNumber(9)}/>
                        <CalcBtn display={6} onClick={() => pushNumber(6)}/>
                        <CalcBtn display={3} onClick={() => pushNumber(3)}/>
                        <CalcBtn display={"="} onClick={pushEqual}/>
                    </Grid>
                    <Grid container justify="center">
                        <CalcBtn display={"+"} onClick={pushPlus}/>
                        <CalcBtn display={"-"} onClick={pushMinus} />
                        <CalcBtn display={"*"} onClick={pushTimes}/>
                        <CalcBtn display={"÷"} onClick={pushDiv}/>
                    </Grid>
                    
                </Grid>
            </div>
        );
    }
}

export default connect(
    state => ({
        displayFormula: state.calculator.displayFormula,
        displayResult: state.calculator.displayResult,
        resultValue: state.calculator.resultValue,
    }),
    dispatch => ({
        pushNumber: (num) => dispatch(pushNumber(num)),
        pushPlus: () => dispatch(pushPlus()),
        pushMinus: () => dispatch(pushMinus()),
        pushTimes: () => dispatch(pushTimes()),
        pushDiv: () => dispatch(pushDiv()),
        pushEqual: () => dispatch(pushEqual()),
        pushAC: () => dispatch(pushAC()),
    })
)(Calculator);