import { Button, Grid, Paper} from '@material-ui/core';
import React, { Component } from 'react';
import { blue, red } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { timerEnd, timerStart } from '../actions';


function unixTime2String(time){
    const sec = Math.floor(time / 1000);
    const msec = time % 1000;
    const minutes = Math.floor(sec / 60);
    const hours = Math.floor(minutes / 60);
    return get2DigestNumer(hours) + ":" +
           get2DigestNumer(minutes) + ":" +
           get2DigestNumer(sec) + ":" +
           get4DigestNumer(msec) + ".";
};

function get2DigestNumer(number) {
    return ("0" + number).slice(-2);
}
function get4DigestNumer(number) {
    return ("00" + number).slice(-3);
}

class Timer extends Component{
    
    state = {nowTime: Date.now(), intervalID: 0};

    componentDidMount() {
        if(this.props.startTime){
            this.handler();
        }
    }

    handler = () => {
        if(this.state.intervalID){
            clearInterval(this.state.intervalID);
            this.setState(prevState => {
                return {
                    ...prevState,
                    intervalID:0,
                };
            });
            return ;
        }

        const newIntervalID = setInterval(()=>{
            this.setState((prevState)=>{
                return {
                ...prevState,
                nowTime: Date.now()
            };
            });
        }, 1);

        this.setState((prevState)=>{
            return {
                ...prevState,
                intervalID: newIntervalID,
            }
        });
    }

    render(){


        const styles = {
            paper: {
                width: "300px",
                height: "75px",
                textAlign: "right",
                margin: "5px",
                padding: "5px",
            },
            buttonStart: {
                backgroundColor: blue[700],
                color: "white",
                margin: "5px",
                width: "100px"
            },
            buttonEnd: {
                backgroundColor: red[700],
                color: "white",
                margin: "5px",
                width: "100px",
                 
            }
        };
        const {startTime, timerStart, timerEnd} = this.props;
        
        return (
            <div>
                <Grid container spacing={4} wrap="nowrap" justifyContent="center">
                    <Paper style={styles.paper}>
                        <h2>{this.state.intervalID ? unixTime2String(this.state.nowTime - startTime) : "00:00:00:000."}</h2>
                    </Paper>
                </Grid>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item>
                        <Button 
                        style={this.state.intervalID ? styles.buttonEnd : styles.buttonStart} 
                        onClick={this.state.intervalID ? ()=>{timerEnd();this.handler();}: ()=>{timerStart();this.handler();}}
                        >
                            {this.state.intervalID ? "End" : "Start"}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default connect(
    state => ({
        startTime: state.timer.startTime
    }),
    dispatch => ({
        timerStart: () => dispatch(timerStart()),
        timerEnd: () => dispatch(timerEnd()),
    }),
)(Timer);