import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions';
class Counter extends Component{
    
    render() {
        const { count, increment, decrement} = this.props;
        return (
            <div>
                <div>
                    count : <span>{count}</span>
                </div>
                <div>
                    <button onClick={increment}>increment</button>
                </div>
                <div>
                    <button onClick={decrement}>decrement</button>
                </div>
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