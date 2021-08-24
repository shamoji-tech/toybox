import { Divider, Grid, Typography,Paper, Button } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './actions';
class Counter extends Component{
    
    render() {
        const { count, increment, decrement} = this.props;
        return (
            <div>
                <Grid container wrap="nowrap" style={{margin: "8px"}}>
                    <Typography variant="h4">Counter</Typography>
                </Grid>
                <Grid container wrap="nowrap" style={{margin: "8px", color:"#9c9c9c",}} >
                    <Typography variant="body1" >カウンター</Typography>
                </Grid>
                <Divider />
                <Grid container wrap="nowrap" justifyContent="center">
                    <Paper style={{width: "100px", height:"40px", textAlign: "center", margin:"8px", padding:"8px",}}>
                        <Typography variant="body1">{count}</Typography>
                    </Paper>
                </Grid>
                <Grid container wrap="nowrap" justifyContent="center" spacing={4}>
                    <Grid item>
                        <Button onClick={increment} color="primary" variant="contained">+1</Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={decrement} color="secondary" variant="contained">-1</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default connect(
    state => ({
        count: state.counter.value,
    }),
    dispatch => ({
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
    })
)(Counter);