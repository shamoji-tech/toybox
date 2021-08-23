import { Paper, Typography } from '@material-ui/core';
import React, { Component } from 'react';


class TimerDisplay extends Component{

    render(){


        const styles = {
            paper: {
                width: "100px",
                textAlign: "center",
                margin: "8px",
                padding: "6px",
            },
        };
        
        return (
            <div>
                    <Paper style={styles.paper}>
                        <Typography >{this.props.isDisplay ? this.props.displayFunction(this.props.displayTime) : this.props.displayDefault}</Typography>
                    </Paper>
            </div>
        );
    }
}

export default TimerDisplay;