import { Button, Grid, Grow, Paper} from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushDiv, pushEqual, pushMinus, pushNumber, pushPlus, pushTimes, pushAC } from './actions';

function CalcBtn(props){
    const styles = {
        root: {
            backgroundColor: "lightgray",
        },
    }
    return (
        <Button style={styles.root} onClick={props.onClick}>{props.display}</Button>
    );
}

class CalculatorBtnGroup extends Component {
    render(){
        return (
            <Grid container wrap="nowrap" justifyContent="center" style={{width: "370px"}} spacing={1}>
                <Grid item>
                    <CalcBtn display={this.props.items[0]} onClick={this.props.functions[0]}/>
                </Grid>
                <Grid item>
                    <CalcBtn display={this.props.items[1]} onClick={this.props.functions[1]}/>
                </Grid>
                <Grid item>
                    <CalcBtn display={this.props.items[2]} onClick={this.props.functions[2]}/>
                </Grid>
                <Grid item>
                    <CalcBtn display={this.props.items[3]} onClick={this.props.functions[3]}/>
                </Grid>
            </Grid>
        );
    }
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
                color: "#9c9c9c",
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
                <Grid container wrap="nowrap" justifyContent="center" spacing={2} style={{width: "400px",}}>
                    <Grid item >
                        <Paper style={styles.paper}>
                            <Grow in={displayResult}>
                                <div style={styles.beforeFormula}>
                                    {displayResult ? displayFormula : ""}
                                </div>
                            </Grow>
                            <div>
                                <h2>{displayResult ? resultValue: displayFormula}</h2>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <CalculatorBtnGroup 
                    items={[7,8,9,"+"]} 
                    functions={[
                        () => pushNumber(7),
                        () => pushNumber(8),
                        () => pushNumber(9),
                        pushPlus,
                ]} />
                <CalculatorBtnGroup 
                    items={[4,5,6,"-"]}
                    functions={[
                        () => pushNumber(4),
                        () => pushNumber(5),
                        () => pushNumber(6),
                        pushMinus,
                    ]}    
                />
                <CalculatorBtnGroup 
                    items={[1,2,3,"×"]}
                    functions={[
                        () => pushNumber(1),
                        () => pushNumber(2),
                        () => pushNumber(3),
                        pushTimes,
                    ]}    
                />
                <CalculatorBtnGroup 
                    items={[0,"AC","=","÷"]}
                    functions={[
                        () => pushNumber(0),
                        pushAC,
                        pushEqual,
                        pushDiv,
                    ]}    
                />
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