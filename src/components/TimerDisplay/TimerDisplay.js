import { Paper, Typography } from '@material-ui/core';
import React, { Component } from 'react';


class TimerDisplay extends Component{

    state = {nowTime: 0, intervalID:0,};

    timerStarter = () => {
        
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

    timerReseter = () => {
        clearInterval(this.state.intervalID);
        this.setState((prevState)=>{
            return {
                ...prevState,
                intervalID: 0,
                nowTime: 0,
            };
        });
    }

    render(){


        const styles = {
            paper: {
                width: "150px",
                textAlign: "center",
                margin: "8px",
                padding: "6px",
            },
        };
        
        return (
            <div>
                    <Paper style={styles.paper}>
                        <Typography >{this.state.nowTime ? this.props.displayFunction(this.state.nowTime - this.props.startTime) : this.props.displayDefault}</Typography>
                    </Paper>
            </div>
        );
    }
}

export default TimerDisplay;